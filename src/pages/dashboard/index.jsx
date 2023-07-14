/* eslint-disable @next/next/no-img-element */
import { Add as AddIcon } from "@mui/icons-material";
import { Button, Container, Grid } from "@mui/material";
import { withStyles } from "@mui/styles";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  AddBox,
  CharacterBox,
  CreatureList,
  EditableRow,
  Header,
  Section,
  TransferAttributesList,
} from "../../components";
import {
  AttributeModal,
  ConfirmationModal,
  CreateCharacterModal,
  DiceRollModal,
  SkillModal,
} from "../../components/modals";
import { prisma } from "../../database";
import useModal from "../../hooks/useModal.hook";
import { api } from "../../utils";

export const getServerSideProps = async () => {
  function parseConfigs(array) {
    return array.map((config) => {
      if (
        config.name === "DICE_ON_SCREEN_TIMEOUT_IN_MS" ||
        "TIME_BETWEEN_DICES_IN_MS"
      ) {
        return {
          ...config,
          value: parseInt(config.value) / 1000,
        };
      }

      return config;
    });
  }

  const characters = await prisma.character.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });

  const attributes = await prisma.attribute.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });

  const skills = await prisma.skill.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });

  const configs = await prisma.config.findMany();

  const serializedCharacters = JSON.parse(JSON.stringify(characters));
  const serializedAttributes = JSON.parse(JSON.stringify(attributes));
  const serializedSkills = JSON.parse(JSON.stringify(skills));
  const serializedConfigs = JSON.parse(JSON.stringify(parseConfigs(configs)));

  return {
    props: {
      initialCharacters: serializedCharacters,
      initialAttributes: serializedAttributes,
      initialSkills: serializedSkills,
      configs: serializedConfigs,
    },
  };
};

function Dashboard({
  classes,
  configs,
  initialSkills,
  initialCharacters,
  initialAttributes,
}) {
  const [skills, setSkills] = useState(initialSkills);
  const [attributes, setAttributes] = useState(initialAttributes);
  const [characters, setCharacters] = useState(initialCharacters);

  const router = useRouter();
  const [updatedConfigs, setUpdatedConfigs] = useState({
    DICE_ON_SCREEN_TIMEOUT_IN_MS: null,
    TIME_BETWEEN_DICES_IN_MS: null,
  });

  useEffect(() => {
    configs.forEach((config) => {
      setUpdatedConfigs((prevState) => ({
        ...prevState,
        [config.name]: config.value,
      }));
    });
  }, [configs]);

  const refreshData = () => {
    return router.replace(router.asPath);
  };

  const updateConfigs = () => {
    api.put("/config/DICE_ON_SCREEN_TIMEOUT_IN_MS", {
      value: `${parseInt(updatedConfigs.DICE_ON_SCREEN_TIMEOUT_IN_MS) * 1000}`,
    });

    api.put("/config/TIME_BETWEEN_DICES_IN_MS", {
      value: `${parseInt(updatedConfigs.TIME_BETWEEN_DICES_IN_MS) * 1000}`,
    });
  };

  const runInitialSetup = () => {
    api.post("/setup").then((res) => {
      if (res.data.success) {
        return window.location.reload();
      }
    });
  };

  const confirmationModal = useModal(({ close, custom }) => (
    <ConfirmationModal
      title={custom.title}
      text={custom.text}
      data={custom.data}
      handleClose={close}
      onConfirmation={(data) => {
        const { id, type } = data;

        api
          .delete(`/${type}/${id}`)
          .then(() => {
            if (type == "attribute") {
              setAttributes(attributes.filter((item) => item.id !== id));
            }
            if (type == "skill") {
              setSkills(skills.filter((item) => item.id !== id));
            }
          })
          .catch(() => {
            alert(`Erro ao apagar: ${type}`);
          });
      }}
    />
  ));

  const createCharacterModal = useModal(({ close }) => (
    <CreateCharacterModal
      handleClose={close}
      onCharacterCreated={() => {
        refreshData();
      }}
    />
  ));

  const attributeModal = useModal(({ close, custom }) => {
    const onSubmit = (newAttribute) => {
      setAttributes(newAttribute);
      close();
    };

    return (
      <AttributeModal
        handleClose={close}
        data={custom.data || null}
        attributeSkill={skills}
        attributes={attributes}
        onSubmit={onSubmit}
        operation={custom.operation}
      />
    );
  });

  const skillModal = useModal(({ close, custom }) => {
    const onSubmit = (newSkill) => {
      setSkills(newSkill);
      close();
    };

    return (
      <SkillModal
        handleClose={close}
        data={custom.data || null}
        onSubmit={onSubmit}
        skills={skills}
        operation={custom.operation}
      />
    );
  });

  const diceRollModal = useModal(({ close, custom }) => (
    <DiceRollModal
    amount={custom.amount}
    onDiceRoll={(rollData) => {
      const parsedData = {
        character_id: 0,
        rolls: rollData.map((each) => ({
          rolled_number: each.rolled_number,
          max_number: each.max_number,
        })),
      };

      socket.emit("dice_roll", parsedData);
    }}
    handleClose={close}
    characterId={0}
  />
  ));

  return (
    <>
      <Container maxWidth="lg" style={{ marginBottom: "30px" }}>
        <Head>
          <title>Mestre | RPG</title>
        </Head>

        <Grid container item spacing={3}>
          <Header title="Dashboard do Mestre" />

          {configs.length > 0 ? (
            <>
              {/* Personagens disponiveis */}
              <Grid item xs={12}>
                <Section
                  title="Fichas de personagens      "
                  image="/assets/characters.png"
                >
                  <Grid item container xs={12} spacing={3}>
                    {characters.map((character, index) => (
                      <Grid item xs={12} md={4} key={index}>
                        <CharacterBox
                          character={character}
                          deleteCharacter={() =>
                            confirmationModal.appear({
                              title: "Apagar personagem",
                              text: "Deseja apagar este personagem?",
                              data: { id: character.id, type: "character" },
                            })
                          }
                        />
                      </Grid>
                    ))}
                    <Grid item xs={12} md={4}>
                      <AddBox onClick={() => createCharacterModal.appear()} />
                    </Grid>
                  </Grid>
                </Section>
              </Grid>

              {/* Lista de ATRIBUTOS adicionadas e opção para adicionar */}
              <Grid item xs={12} md={6}>
                <Section
                  title="Atributos   "
                  image="/assets/atributes.png"
                  renderButton={() => (
                    <Button
                      variant="outlined"
                      style={{
                        display: "flex",
                        alignSelf: "center",
                      }}
                      onClick={() =>
                        attributeModal.appear({ operation: "create" })
                      }
                    >
                      <AddIcon />
                    </Button>
                  )}
                >
                  <Grid
                    item
                    container
                    xs={12}
                    spacing={2}
                    className={classes.scrollableBox}
                  >
                    {/* Para cada atributo existente, exiba as informações */}
                    {attributes.map((attribute, index) => (
                      <Grid item xs={12} key={index}>
                        <EditableRow
                          data={attribute}
                          editRow={(data) => {
                            attributeModal.appear({ operation: "edit", data });
                          }}
                          deleteRow={(data) => {
                            confirmationModal.appear({
                              title: "Apagar atributo",
                              text: "Deseja apagar este atributo?",
                              data: { id: data.id, type: "attribute" },
                            });
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Section>
              </Grid>

              {/* Lista de PERICIAS adicionadas e opção para adicionar */}
              <Grid item xs={12} md={6}>
                <Section
                  title="Perícias   "
                  image="/assets/expertise.png"
                  renderButton={() => (
                    <Button
                      variant="outlined"
                      style={{
                        display: "flex",
                        alignSelf: "center",
                      }}
                      onClick={() => skillModal.appear({ operation: "create" })}
                    >
                      <AddIcon />
                    </Button>
                  )}
                >
                  <Grid
                    item
                    container
                    xs={12}
                    spacing={2}
                    className={classes.scrollableBox}
                  >
                    {skills.map((skill, index) => (
                      <Grid item xs={12} key={index}>
                        <EditableRow
                          data={skill}
                          editRow={(data) => {
                            skillModal.appear({ operation: "edit", data });
                          }}
                          deleteRow={(data) => {
                            confirmationModal.appear({
                              title: "Apagar perícia",
                              text: "Deseja apagar esta perícia?",
                              data: { id: data.id, type: "skill" },
                            });
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Section>
              </Grid>

              {/* Agrupamentos de atributos por pericias */}
              <Grid item xs={12}>
                <Section
                  title="Classificação de atributos    "
                  image="/assets/groupAttibutes.png"
                >
                  <Grid item container xs={12} spacing={2}>
                    <TransferAttributesList
                      attributes={attributes}
                      skills={skills}
                    ></TransferAttributesList>
                  </Grid>
                </Section>
              </Grid>

              {/* Monstros disponiveis na campanha */}
              {/* <Grid item xs={12}>
                <Section
                  title="Criaturas    "
                  image="/assets/groupAttibutes.png"
                >
                  <Grid item container xs={12} spacing={2}>
                    <CreatureList />
                  </Grid>
                </Section>
              </Grid> */}

              {/* Rolagem de dados */}
              <Grid item xs={12}>
                <Section
                  title="Rolagem de dados    "
                  image="/assets/mastersDice/fire.png"
                >
                  <Grid item container xs={8} spacing={2} className={classes.marginCenter}>
                      <Grid item xs={12}>
                        <img className={classes.dice}
                          src="/assets/mastersDice/d4.png"
                          alt="D4"
                          onClick={() => diceRollModal.appear({ amount: '1d4' })}
                        />
                        <img className={classes.dice}
                          src="/assets/mastersDice/d6.png"
                          alt="D6"
                          onClick={() => diceRollModal.appear({ amount: '1d6' })}
                        />
                        <img className={classes.dice}
                          src="/assets/mastersDice/d8.png"
                          alt="D8"
                          onClick={() => diceRollModal.appear({ amount: '1d8' })}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <img className={classes.dice}
                          src="/assets/mastersDice/d10.png"
                          alt="D10"
                          onClick={() => diceRollModal.appear({ amount: '1d10' })}
                        />
                        <img className={classes.dice}
                          src="/assets/mastersDice/d12.png"
                          alt="D12"
                          onClick={() => diceRollModal.appear({ amount: '1d12' })}
                        />
                        <img className={classes.dice}
                          src="/assets/mastersDice/d20.png"
                          alt="D20"
                          onClick={() => diceRollModal.appear({ amount: '1d20' })}
                        />
                      </Grid>
                    </Grid>
                </Section>
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              <Button variant="contained" onClick={runInitialSetup} fullWidth>
                REALIZAR CONFIGURAÇÃO INICIAL
              </Button>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}

const styles = (theme) => ({
  scrollableBox: {
    overflow: "auto",
    maxHeight: "300px",
    paddingRight: "10px",
    paddingLeft: "20%",
  },
  marginCenter: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  dice: {
    width: "33.33%",
    cursor: "pointer",
  },
});

export default withStyles(styles)(Dashboard);

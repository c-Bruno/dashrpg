import { Button, Container, Grid } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Header, Section, TransferAttributesList } from '../../components';
import { AttributeModal, ConfirmationModal, SkillModal } from '../../components/modals';
import { AvailableCharacters } from '../../components/AvailableCharacters';
import { AttributesList } from '../../components/AttributesList';
import { prisma } from '../../database';
import useModal from '../../hooks/useModal.hook';
import { api } from '../../utils';
import SkillsList from '../../components/SkillsList/SkillsList';
import MasterDices from '../../components/MasterDices/MasterDices';
import { t } from 'i18next';

export const getServerSideProps = async () => {
  function parseConfigs(array) {
    return array.map(config => {
      if (config.name === 'DICE_ON_SCREEN_TIMEOUT_IN_MS' || 'TIME_BETWEEN_DICES_IN_MS') {
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
        name: 'asc',
      },
    ],
  });

  const attributes = await prisma.attribute.findMany({
    orderBy: [
      {
        name: 'asc',
      },
    ],
  });

  const skills = await prisma.skill.findMany({
    orderBy: [
      {
        name: 'asc',
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

function Dashboard({ configs, initialSkills, initialCharacters, initialAttributes }) {
  const [skills, setSkills] = useState(initialSkills);
  const [attributes, setAttributes] = useState(initialAttributes);
  const [characters, setCharacters] = useState(initialCharacters);

  const router = useRouter();
  const [updatedConfigs, setUpdatedConfigs] = useState({
    DICE_ON_SCREEN_TIMEOUT_IN_MS: null,
    TIME_BETWEEN_DICES_IN_MS: null,
  });

  useEffect(() => {
    configs.forEach(config => {
      setUpdatedConfigs(prevState => ({
        ...prevState,
        [config.name]: config.value,
      }));
    });
  }, [configs]);

  const refreshData = () => {
    return router.replace(router.asPath);
  };

  const updateConfigs = () => {
    api.put('/config/DICE_ON_SCREEN_TIMEOUT_IN_MS', {
      value: `${parseInt(updatedConfigs.DICE_ON_SCREEN_TIMEOUT_IN_MS) * 1000}`,
    });

    api.put('/config/TIME_BETWEEN_DICES_IN_MS', {
      value: `${parseInt(updatedConfigs.TIME_BETWEEN_DICES_IN_MS) * 1000}`,
    });
  };

  const runInitialSetup = () => {
    api.post('/setup').then(res => {
      if (res.data.success) {
        if (typeof window !== 'undefined') {
          return window.location.reload();
        }
      }
    });
  };

  const confirmationModal = useModal(({ close, custom }) => (
    <ConfirmationModal
      title={custom.title}
      text={custom.text}
      data={custom.data}
      handleClose={close}
      onConfirmation={data => {
        const { id, type } = data;

        api
          .delete(`/${type}/${id}`)
          .then(() => {
            if (type == 'attribute') {
              setAttributes(attributes.filter(item => item.id !== id));
            }
            if (type == 'skill') {
              setSkills(skills.filter(item => item.id !== id));
            }
          })
          .catch(() => {
            alert(`Erro ao apagar: ${type}`);
          });
      }}
    />
  ));

  const attributeModal = useModal(({ close, custom }) => {
    const onSubmit = newAttribute => {
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
    const onSubmit = newSkill => {
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

  return (
    <Container maxWidth='lg' style={{ marginBottom: '30px' }}>
      <Head>
        <title>Mestre | RPG</title>
      </Head>

      <Grid container item spacing={3}>
        <Header title='Dashboard do Mestre' />

        {configs.length > 0 ? (
          <>
            {/* /* Available characters */}
            <Grid item xs={12}>
              <AvailableCharacters
                characters={characters}
                confirmationModal={confirmationModal}
                refreshData={refreshData}
              />
            </Grid>

            {/* /* List of added ATTRIBUTES and option to add */}
            <Grid item xs={12} md={6}>
              <AttributesList
                attributes={attributes}
                attributeModal={attributeModal}
                confirmationModal={confirmationModal}
              />
            </Grid>

            {/* /* List of added SKILLS and option to add */}
            <Grid item xs={12} md={6}>
              <SkillsList
                skills={skills}
                skillModal={skillModal}
                confirmationModal={confirmationModal}
              />
            </Grid>

            {/* Agrupamentos de atributos por pericias */}
            <Grid item xs={12}>
              <Section title='Classificação de atributos    ' image='/assets/groupAttibutes.png'>
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
              <MasterDices />
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <Button variant='contained' onClick={runInitialSetup} fullWidth>
              REALIZAR CONFIGURAÇÃO INICIAL
            </Button>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Dashboard;

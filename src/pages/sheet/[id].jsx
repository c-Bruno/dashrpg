import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Container, Grid } from '@mui/material';
import { api } from 'common/libs';
import { Header } from 'main/components/atoms';
import { AttributeStatusItem, DiceRollModal, StatusBarModal, ChangePictureModal } from 'main/components/molecules';
import {
  CharacterInfoForm,
  InventoryList,
  SpecialItem,
  WeaponStatusList,
  CharacterOverview,
  SkillsList,
} from 'main/components/organisms';
import { WrappedCard } from 'main/components/templates';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { CombatModal, ConfirmationModal, InventoryModal } from '../../components/modals';
import { prisma } from '../../database';
import useModal from '../../hooks/useModal.hook';
import * as characterActions from '../../redux/actions/character.actions';
import socket from '../../utils/socket';

export const getServerSideProps = async ({ params }) => {
  const characterId = isNaN(params.id) ? null : Number(params.id);

  if (!characterId) {
    return {
      props: {
        character: null,
      },
    };
  }

  // Recupera o personagem no banco
  const character = await prisma.character.findUnique({
    where: {
      id: characterId,
    },
    include: {
      attributes: {
        include: {
          attribute: true,
        },
      },
      skills: {
        include: {
          skill: true,
        },
      },
      inventory: {
        include: {
          inventory: true,
        },
      },
      combat: {
        include: {
          combat: true,
        },
      },
    },
  });

  // Se não tiver, seta como null para notificar que não existe
  if (!character) {
    return {
      props: {
        character: null,
      },
    };
  }

  const serialized = JSON.parse(JSON.stringify(character));

  return {
    props: {
      rawCharacter: serialized,
    },
  };
};

function Sheet({ rawCharacter }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const refreshData = () => {
    return router.replace(router.asPath);
  };

  const [character, setCharacter] = useState(rawCharacter);

  const onCharacterInfoSubmit = async (values) => {
    return new Promise((resolve, reject) => {
      api
        .put(`/character/${character.id}`, values)
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  };

  // Atualiza(update) o valor de VIDA no banco
  const onHitPointsModalSubmit = async (newData) => {
    return new Promise((resolve, reject) => {
      const data = {
        current_hit_points: Number(newData.current),
        max_hit_points: Number(newData.max),
      };

      api
        .put(`/character/${character.id}`, data)
        .then(() => {
          updateCharacterState(data);

          resolve();

          socket.emit('update_hit_points', {
            character_id: character.id,
            current: data.current_hit_points,
            max: data.max_hit_points,
          });
        })
        .catch((err) => {
          toast.error(`Erro ao atualizar a vida!`, err);

          reject();
        });
    });
  };

  // Atualiza(update) o valor de SANIDADE no banco
  const onSanityPointsModalSubmit = async (newData) => {
    return new Promise((resolve, reject) => {
      const data = {
        current_sanity_points: Number(newData.current),
        max_sanity_points: Number(newData.max),
      };

      api
        .put(`/character/${character.id}`, data)
        .then(() => {
          updateCharacterState(data);
          resolve();

          socket.emit('update_hit_points', {
            character_id: character.id,
            current: data.current_sanity_points,
            max: data.max_sanity_points,
          });
        })
        .catch((err) => {
          toast.error(`Erro ao atualizar a sanidade!`, err);
          reject();
        });
    });
  };

  useEffect(() => {
    setCharacter(rawCharacter);
  }, [rawCharacter]);

  const updateCharacterState = (data) => {
    return setCharacter((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  // Modal de confirmação
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
            setCharacter((prevCharacter) => ({
              ...prevCharacter,
              [type]: prevCharacter[type].filter((item) => item[`${type}_id`] !== id),
            }));
          })
          .catch(() => {
            toast.error(`Erro ao apagar: ${type}`);
          });
      }}
    />
  ));

  // Modal de vida
  const hitPointsModal = useModal(({ close }) => (
    <StatusBarModal
      type='hp'
      onSubmit={async (newData) => {
        onHitPointsModalSubmit(newData).then(() => close());
      }}
      handleClose={close}
      data={{
        current: character.current_hit_points,
        max: character.max_hit_points,
      }}
    />
  ));

  // Modal de Sanidade
  const sanityPointsModal = useModal(({ close }) => (
    <StatusBarModal
      type='sn'
      onSubmit={async (newData) => {
        onSanityPointsModalSubmit(newData).then(() => close());
      }}
      handleClose={close}
      data={{
        current: character.current_sanity_points,
        max: character.max_sanity_points,
      }}
    />
  ));

  // Modal dos dados
  const diceRollModal = useModal(({ close }) => (
    <DiceRollModal amount={'1d100'} handleClose={close} characterId={character.id} />
  ));

  // Alterar foto de personagem
  const changePictureModal = useModal(({ close }) => (
    <ChangePictureModal onPictureChange={() => refreshData()} handleClose={close} character={character} />
  ));

  // Aciona o modal de inventario
  const inventoryModal = useModal(({ close, custom }) => {
    const { data, character: inventoryCharacter, space, operation } = custom;

    const onSubmit = (newCharacter) => {
      setCharacter(newCharacter);
      close();
    };

    return (
      <InventoryModal
        handleClose={close}
        data={data || null}
        character={inventoryCharacter || data.character_id}
        totalSpace={space}
        onSubmit={onSubmit}
        operation={operation}
        fullCharacter={character}
      />
    );
  });

  // Aciona o modal de combate
  const combatModal = useModal(({ close, custom }) => {
    const { data, character: combatCharacter, operation } = custom;

    const onSubmit = (newCharacter) => {
      setCharacter(newCharacter);
      close();
    };

    return (
      <CombatModal
        handleClose={close}
        data={data || null}
        character={combatCharacter || data.character_id}
        onSubmit={onSubmit}
        operation={operation}
        fullCharacter={character}
      />
    );
  });

  useEffect(() => {
    dispatch(characterActions.updateCharacter('teste'));
  }, []);

  if (!rawCharacter) {
    return <div>Personagem não existe!</div>;
  }

  return (
    <Container style={{ marginBottom: '30px', maxWidth: '1400px' }}>
      <Head>
        <title>{character.name} | RPG</title>{' '}
      </Head>

      <Grid container item spacing={3}>
        <Header title={`${character.name}`} />

        <Grid container item xs={12} spacing={3}>
          {/* Grid de overview do personagem contento imagem, vida e sanidade */}
          <Grid item xs={12} md={4}>
            <WrappedCard entityType='characterOverview' character={character}>
              <CharacterOverview
                character={character}
                diceRollModal={diceRollModal}
                hitPointsModal={hitPointsModal}
                sanityPointsModal={sanityPointsModal}
                changePictureModal={changePictureModal}
              />
            </WrappedCard>
          </Grid>

          {/* Grid contendo todos os dados pessoais do personagem */}
          <Grid item xs={12} md={8}>
            <WrappedCard entityType='characterInfoForm' character={character}>
              <CharacterInfoForm initialValues={character} onSubmit={onCharacterInfoSubmit} />
            </WrappedCard>
          </Grid>

          {/* Itens do inventario */}
          <Grid item xs={12} md={4}>
            <WrappedCard entityType='inventory' character={character} modal={inventoryModal}>
              <InventoryList
                character={character}
                inventoryModal={inventoryModal}
                confirmationModal={confirmationModal}
              />
            </WrappedCard>
          </Grid>

          {/* Atributos de habilidade */}
          <Grid item xs={12} md={8}>
            <WrappedCard entityType='attribute' character={character}>
              <AttributeStatusItem character={character} setCharacter={setCharacter} />
            </WrappedCard>
          </Grid>

          {/* Ações de combate */}
          <Grid item xs={12}>
            <WrappedCard entityType='combat' character={character} modal={combatModal}>
              <WeaponStatusList
                character={character}
                handleCharacter={(newCharacter) => {
                  setCharacter(newCharacter);
                }}
              />
            </WrappedCard>
          </Grid>

          {/* Item especial */}
          <Grid item xs={12} md={4}>
            <WrappedCard entityType='SpecialItem' character={character}>
              <SpecialItem character={character} />
            </WrappedCard>
          </Grid>

          {/* Pericias */}
          <Grid item xs={8}>
            <WrappedCard entityType='skills' character={character}>
              <SkillsList character={character} setCharacter={setCharacter} />
            </WrappedCard>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Sheet;

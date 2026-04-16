import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Container, Grid } from '@mui/material';
import { useModal } from 'common/hooks';
import { api, socket } from 'common/libs';
import { prisma } from 'common/libs/prisma.lib';
import type { Character } from 'common/types';
import { Header } from 'main/components/atoms';
import {
  AttributeStatusItem,
  DiceRollModal,
  StatusBarModal,
  ChangePictureModal,
  ConfirmationModal,
  InventoryModal,
  CombatModal,
} from 'main/components/molecules';
import {
  CharacterInfoForm,
  InventoryList,
  SpecialItem,
  WeaponStatusList,
  CharacterOverview,
  SkillsList,
} from 'main/components/organisms';
import { WrappedCard } from 'main/components/templates';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

// ---------------------------------------------------------------------------
// Server-side data fetching
// ---------------------------------------------------------------------------

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const characterId = isNaN(Number(params?.id)) ? null : Number(params?.id);

  if (!characterId) {
    return { props: { rawCharacter: null } };
  }

  // Fetch the full character with all nested relations needed for the sheet
  const character = await prisma.character.findUnique({
    where: { id: characterId },
    include: {
      attributes: { include: { attribute: true } },
      skills: { include: { skill: true } },
      inventory: { include: { inventory: true } },
      combat: { include: { combat: true } },
    },
  });

  if (!character) {
    return { props: { rawCharacter: null } };
  }

  // Serialize dates/BigInt values so Next.js can pass them as JSON props
  const serialized = JSON.parse(JSON.stringify(character));

  return { props: { rawCharacter: serialized } };
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface SheetProps {
  rawCharacter: Character | null;
}

const Sheet = ({ rawCharacter }: SheetProps) => {
  const router = useRouter();

  const [character, setCharacter] = useState<Character | null>(rawCharacter);

  // Sync local state when the page is refreshed via router.replace
  useEffect(() => {
    setCharacter(rawCharacter);
  }, [rawCharacter]);

  const refreshData = () => router.replace(router.asPath);

  /** Merges a partial update into the local character state */
  const updateCharacterState = (data: Partial<Character>) =>
    setCharacter((prev) => (prev ? { ...prev, ...data } : prev));

  // -------------------------------------------------------------------------
  // API handlers
  // -------------------------------------------------------------------------

  const onCharacterInfoSubmit = async (values: Partial<Character>) => {
    await api.put(`/character/${character?.id}`, values);
  };

  /** Persists new HP values and notifies connected clients via WebSocket */
  const onHitPointsModalSubmit = async (newData: { current: string; max: string }) => {
    const data = {
      current_hit_points: Number(newData.current),
      max_hit_points: Number(newData.max),
    };

    try {
      await api.put(`/character/${character?.id}`, data);
      updateCharacterState(data);

      socket.emit('update_hit_points', {
        character_id: character?.id,
        current: data.current_hit_points,
        max: data.max_hit_points,
      });
    } catch {
      toast.error('Erro ao atualizar a vida!');
    }
  };

  /** Persists new sanity values and notifies connected clients via WebSocket */
  const onSanityPointsModalSubmit = async (newData: { current: string; max: string }) => {
    const data = {
      current_sanity_points: Number(newData.current),
      max_sanity_points: Number(newData.max),
    };

    try {
      await api.put(`/character/${character?.id}`, data);
      updateCharacterState(data);

      socket.emit('update_hit_points', {
        character_id: character?.id,
        current: data.current_sanity_points,
        max: data.max_sanity_points,
      });
    } catch {
      toast.error('Erro ao atualizar a sanidade!');
    }
  };

  // -------------------------------------------------------------------------
  // Modals
  // -------------------------------------------------------------------------

  const confirmationModal = useModal(({ close, custom }: any) => (
    <ConfirmationModal
      title={custom.title}
      text={custom.text}
      data={custom.data}
      handleClose={close}
      onConfirmation={(data: { id: number; type: string }) => {
        const { id, type } = data;

        api
          .delete(`/${type}/${id}`)
          .then(() => {
            setCharacter((prev) =>
              prev
                ? {
                    ...prev,
                    [type]: (prev as any)[type].filter((item: any) => item[`${type}_id`] !== id),
                  }
                : prev,
            );
          })
          .catch(() => toast.error(`Erro ao apagar: ${type}`));
      }}
    />
  ));

  const hitPointsModal = useModal(({ close }: any) => (
    <StatusBarModal
      type='hp'
      onSubmit={async (newData: any) => {
        await onHitPointsModalSubmit(newData);
        close();
      }}
      handleClose={close}
      data={{
        current: character?.current_hit_points,
        max: character?.max_hit_points,
      }}
    />
  ));

  const sanityPointsModal = useModal(({ close }: any) => (
    <StatusBarModal
      type='sn'
      onSubmit={async (newData: any) => {
        await onSanityPointsModalSubmit(newData);
        close();
      }}
      handleClose={close}
      data={{
        current: character?.current_sanity_points,
        max: character?.max_sanity_points,
      }}
    />
  ));

  const diceRollModal = useModal(({ close }: any) => <DiceRollModal amount='1d100' handleClose={close} />);

  const changePictureModal = useModal(({ close }: any) => (
    <ChangePictureModal onPictureChange={refreshData} handleClose={close} character={character} />
  ));

  const inventoryModal = useModal(({ close, custom }: any) => {
    const { data, character: inventoryCharacter, space, operation } = custom;

    return (
      <InventoryModal
        handleClose={close}
        data={data ?? null}
        character={inventoryCharacter ?? data.character_id}
        totalSpace={space}
        onSubmit={(newCharacter: Character) => {
          setCharacter(newCharacter);
          close();
        }}
        operation={operation}
        fullCharacter={character}
      />
    );
  });

  const combatModal = useModal(({ close, custom }: any) => {
    const { data, character: combatCharacter, operation } = custom;

    return (
      <CombatModal
        handleClose={close}
        data={data ?? null}
        character={combatCharacter ?? data.character_id}
        onSubmit={(newCharacter: Character) => {
          setCharacter(newCharacter);
          close();
        }}
        operation={operation}
        fullCharacter={character}
      />
    );
  });

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  if (!rawCharacter) {
    return <div>Personagem não existe!</div>;
  }

  return (
    <Container style={{ marginBottom: '30px', maxWidth: '1400px' }}>
      <Head>
        <title>{`${character?.name ?? ''} | RPG`}</title>
      </Head>

      <Grid container item spacing={3}>
        <Header title={`${character?.name}`} />

        <Grid container item xs={12} spacing={3}>
          {/* Overview: imagem, vida e sanidade */}
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

          {/* Dados pessoais do personagem */}
          <Grid item xs={12} md={8}>
            <WrappedCard entityType='characterInfoForm' character={character}>
              <CharacterInfoForm initialValues={character} onSubmit={onCharacterInfoSubmit} />
            </WrappedCard>
          </Grid>

          {/* Inventário */}
          <Grid item xs={12} md={4}>
            <WrappedCard entityType='inventory' character={character} modal={inventoryModal}>
              <InventoryList
                character={character}
                inventoryModal={inventoryModal}
                confirmationModal={confirmationModal}
              />
            </WrappedCard>
          </Grid>

          {/* Atributos */}
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
                handleCharacter={(newCharacter: Character) => setCharacter(newCharacter)}
              />
            </WrappedCard>
          </Grid>

          {/* Item especial */}
          <Grid item xs={12} md={4}>
            <WrappedCard entityType='SpecialItem' character={character}>
              <SpecialItem character={character} />
            </WrappedCard>
          </Grid>

          {/* Perícias */}
          <Grid item xs={8}>
            <WrappedCard entityType='skills' character={character}>
              <SkillsList character={character} setCharacter={setCharacter} />
            </WrappedCard>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Sheet;

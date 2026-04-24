import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Container, Grid } from '@mui/material';
import { useModal } from 'common/hooks';
import { api } from 'common/libs';
import { prisma } from 'common/libs/prisma.lib';
import type { Character } from 'common/types';
import { CoverTitle, Header } from 'main/components/atoms';
import {
  AttributeStatusItem,
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

  // -------------------------------------------------------------------------
  // API handlers
  // -------------------------------------------------------------------------

  const onCharacterInfoSubmit = async (values: Partial<Character>) => {
    await api.put(`/character/${character?.id}`, values);
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
      <CoverTitle title={`${character?.name} `} />

      <Grid container spacing={3}>
        <Header title={`${character?.name}`} />

        <Grid container spacing={3} size={12}>
          {/* Overview: imagem, vida e sanidade */}
          <WrappedCard entityType='characterOverview' character={character} size={{ xs: 12, md: 4 }}>
            <CharacterOverview
              character={character}
              setCharacter={setCharacter}
              changePictureModal={changePictureModal}
            />
          </WrappedCard>

          {/* Dados pessoais do personagem */}
          <WrappedCard entityType='characterInfoForm' character={character} size={{ xs: 12, md: 8 }}>
            <CharacterInfoForm initialValues={character} onSubmit={onCharacterInfoSubmit} />
          </WrappedCard>

          {/* Inventário */}
          <WrappedCard entityType='inventory' character={character} modal={inventoryModal} size={{ xs: 12, md: 4 }}>
            <InventoryList
              character={character}
              inventoryModal={inventoryModal}
              confirmationModal={confirmationModal}
            />
          </WrappedCard>

          {/* Atributos */}
          <WrappedCard entityType='attribute' character={character} size={{ xs: 12, md: 8 }}>
            <AttributeStatusItem character={character} setCharacter={setCharacter} />
          </WrappedCard>

          {/* Ações de combate */}
          <WrappedCard entityType='combat' character={character} modal={combatModal} size={12}>
            <WeaponStatusList
              character={character}
              handleCharacter={(newCharacter: Character) => setCharacter(newCharacter)}
            />
          </WrappedCard>

          {/* Item especial */}
          <WrappedCard entityType='SpecialItem' character={character} size={{ xs: 12, md: 4 }}>
            <SpecialItem character={character} />
          </WrappedCard>

          {/* Perícias */}
          <WrappedCard entityType='skills' character={character} size={8}>
            <SkillsList character={character} setCharacter={setCharacter} />
          </WrappedCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Sheet;

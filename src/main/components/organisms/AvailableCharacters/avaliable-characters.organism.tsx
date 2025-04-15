import React from 'react';
import { useTranslation } from 'react-i18next';

import { Grid } from '@mui/material';
import { useModal } from 'common/hooks';
import { AddButtonBox } from 'main/components/atoms';
import { CharacterSnapshotCard, Section } from 'main/components/molecules';
import { CreateCharacterModal } from 'src/components/modals';

interface AvailableCharactersProps {
  characters: any[];
  refreshData: () => Promise<boolean>;
  confirmationModal: any;
}

const AvailableCharacters: React.FC<AvailableCharactersProps> = ({ characters, refreshData, confirmationModal }) => {
  const { t } = useTranslation(['masterDashboard']);

  const createCharacterModal = useModal(({ close }) => (
    <CreateCharacterModal
      handleClose={close}
      onCharacterCreated={() => {
        refreshData();
      }}
    />
  ));

  return (
    <Section title={t('characters.title')} image='/assets/characters.png'>
      <Grid item container xs={12} spacing={3}>
        {characters.map((character, index) => (
          <Grid item xs={12} md={4} key={index}>
            <CharacterSnapshotCard
              character={character}
              deleteCharacter={() =>
                confirmationModal.appear({
                  title: t('excludeCharacterModal.title'),
                  text: t('excludeCharacterModal.description'),
                  data: { id: character.id, type: 'character' },
                })
              }
            />
          </Grid>
        ))}

        <Grid item xs={12} md={4}>
          <AddButtonBox onClick={() => createCharacterModal.appear()} />
        </Grid>
      </Grid>
    </Section>
  );
};

export default AvailableCharacters;

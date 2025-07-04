import React from 'react';

import { Grid } from '@mui/material';
import { useModal } from 'common/hooks';
import { AddButtonBox } from 'main/components/atoms';
import { CharacterSnapshotCard, CreateCharacterModal } from 'main/components/molecules';

interface AvailableCharactersProps {
  characters: any[];
  confirmationModal: any;
}

const AvailableCharacters: React.FC<AvailableCharactersProps> = ({ characters, confirmationModal }) => {
  const createCharacterModal = useModal(({ close }) => <CreateCharacterModal handleClose={close} />);

  return (
    <Grid item container xs={12} spacing={3}>
      {characters.map((character) => (
        <Grid item xs={12} md={4} key={character.id}>
          <CharacterSnapshotCard
            character={character}
            deleteCharacter={() =>
              confirmationModal.appear({
                title: 'Apagar personagem',
                text: 'Tem certeza que deseja apagar o personagem?',
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
  );
};

export default AvailableCharacters;


import { Grid } from '@mui/material';
import { useModal } from 'common/hooks';
import { AddButtonBox } from 'main/components/atoms';
import { CharacterSnapshotCard, CreateCharacterModal } from 'main/components/molecules';

interface AvailableCharactersProps {
  characters: any[];
  confirmationModal: any;
}

const AvailableCharacters = ({ characters, confirmationModal }: AvailableCharactersProps) => {
  const createCharacterModal = useModal(({ close }) => <CreateCharacterModal handleClose={close} />);

  return (
    <Grid container spacing={3} size={12}>
      {characters.map((character) => (
        <Grid key={character.id} size={{ xs: 12, md: 4 }}>
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

      <Grid size={{ xs: 12, md: 4 }}>
        <AddButtonBox onClick={() => createCharacterModal.appear()} />
      </Grid>
    </Grid>
  );
};

export default AvailableCharacters;

import { Grid } from '@mui/material';
import { useModal } from 'common/hooks';
import { CharacterSnapshotCard, CreateCharacterModal, ActionButton, InfoModal } from 'main/components/molecules';

interface AvailableCharactersProps {
  characters: any[];
}

const AvailableCharacters = ({ characters }: AvailableCharactersProps) => {
  const createCharacterModal = useModal(({ close }) => <CreateCharacterModal handleClose={close} />);

  const infoModal = useModal(({ close, custom }) => (
    <InfoModal
      showConfirm
      title='Apagar personagem'
      text='Tem certeza que deseja apagar o personagem?'
      data={custom.data}
      handleClose={close}
    />
  ));

  return (
    <Grid container spacing={3} size={12}>
      {characters.map((character) => (
        <Grid key={character.id} size={{ xs: 12, md: 5 }}>
          <CharacterSnapshotCard
            character={character}
            deleteCharacter={() => infoModal.appear({ data: { id: character.id, type: 'character' } })}
          />
        </Grid>
      ))}

      <ActionButton onClick={() => createCharacterModal.appear()} />
    </Grid>
  );
};

export default AvailableCharacters;

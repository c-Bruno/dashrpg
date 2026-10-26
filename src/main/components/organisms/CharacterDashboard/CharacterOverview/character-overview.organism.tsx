import type { Dispatch, SetStateAction } from 'react';

import { FormControlLabel, Switch } from '@mui/material';
import { StatusBarEnum } from 'common/enums';
import { characterPicture } from 'common/helpers';
import { useModal } from 'common/hooks';
import type { Character } from 'common/types';
import { CharacterStatusBar } from 'features/character-status';
import { Dice, RoundedImage } from 'main/components/atoms';
import { DiceRollModal } from 'main/components/molecules';

import * as S from './character-overview.styles';

interface CharacterOverviewProps {
  character: Character;
  changePictureModal: { appear: () => void };
  setCharacter: Dispatch<SetStateAction<Character | null>>;
}

const CharacterOverview = ({ character, changePictureModal, setCharacter }: CharacterOverviewProps) => {
  const characterPictureURL = characterPicture.getCharacterPictureURL(character);

  const handleCharacterUpdate = (updates: Partial<Character>) => {
    setCharacter((previous) => (previous ? { ...previous, ...updates } : previous));
  };

  const handleImageClick = () => changePictureModal.appear();

  const diceRollModal = useModal(({ close }: any) => (
    <DiceRollModal amount='1d100' character={{ id: character.id, name: character.name }} handleClose={close} />
  ));

  return (
    <S.CenteredGrid container spacing={3}>
      <RoundedImage src={characterPictureURL} width={140} height={140} onClick={handleImageClick} hoverEffect />

      <CharacterStatusBar character={character} onCharacterUpdate={handleCharacterUpdate} />
      <CharacterStatusBar
        character={character}
        variant={StatusBarEnum.Sanity}
        onCharacterUpdate={handleCharacterUpdate}
      />

      <FormControlLabel control={<Switch color='secondary' />} label='Traumatizado' />
      <FormControlLabel control={<Switch color='secondary' />} label='Morrendo' />

      <Dice onClick={() => diceRollModal.appear()} />
    </S.CenteredGrid>
  );
};

export default CharacterOverview;

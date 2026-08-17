import { FormControlLabel, Switch } from '@mui/material';
import { StatusBarEnum } from 'common/enums';
import { characterPicture } from 'common/helpers';
import { useModal } from 'common/hooks';
import { Dice, RoundedImage } from 'main/components/atoms';
import { DiceRollModal, StatusBar } from 'main/components/molecules';

import * as S from './character-overview.styles';

const CharacterOverview = ({ character, changePictureModal, setCharacter }) => {
  const characterPictureURL = characterPicture.getCharacterPictureURL(character);

  const { id, current_hit_points, max_hit_points, current_sanity_points, max_sanity_points } = character;

  const handleImageClick = () => changePictureModal.appear();

  // This modal is used for rolling a d100 when the dice icon is clicked in the character overview section.
  const diceRollModal = useModal(({ close }: any) => <DiceRollModal amount='1d100' handleClose={close} />);

  return (
    <S.CenteredGrid container spacing={3}>
      <RoundedImage src={characterPictureURL} width={140} height={140} onClick={handleImageClick} hoverEffect />

      <StatusBar total={max_hit_points} current={current_hit_points} characterId={id} setCharacter={setCharacter} />
      <StatusBar
        total={max_sanity_points}
        current={current_sanity_points}
        variant={StatusBarEnum.Sanity}
        characterId={id}
        setCharacter={setCharacter}
      />

      <FormControlLabel control={<Switch color='secondary' />} label='Traumatizado' />
      <FormControlLabel control={<Switch color='secondary' />} label='Morrendo' />

      {/* Dado para rolagem d100 */}
      <Dice width={80} height={80} altText='Dice roll' onClick={() => diceRollModal.appear()} />
    </S.CenteredGrid>
  );
};

export default CharacterOverview;

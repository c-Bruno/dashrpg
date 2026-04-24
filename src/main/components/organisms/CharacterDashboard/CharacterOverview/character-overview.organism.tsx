import { FormControlLabel, Switch } from '@mui/material';
import { StatusBarEnum } from 'common/enums';
import { characterPicture, ProgressBarHelper } from 'common/helpers';
import { useModal } from 'common/hooks';
import { Dice, RoundedImage } from 'main/components/atoms';
import { DiceRollModal, StatusBar } from 'main/components/molecules';

import * as S from './character-overview.styles';

const CharacterOverview = ({ character, changePictureModal, setCharacter }) => {
  const characterPictureURL = characterPicture.getCharacterPictureURL(character);

  const { id, current_hit_points, max_hit_points, current_sanity_points, max_sanity_points } = character;

  const handleImageClick = () => changePictureModal.appear();

  const hpPercent = ProgressBarHelper.Percentage(current_hit_points, max_hit_points);
  const sanityPercent = ProgressBarHelper.Percentage(current_sanity_points, max_sanity_points);

  // This modal is used for rolling a d100 when the dice icon is clicked in the character overview section.
  const diceRollModal = useModal(({ close }: any) => <DiceRollModal amount='1d100' handleClose={close} />);

  return (
    <S.CenteredGrid container spacing={3}>
      <S.CenteredGrid size={6}>
        <RoundedImage src={characterPictureURL} width={140} height={140} onClick={handleImageClick} hoverEffect />
      </S.CenteredGrid>

      <S.CenteredGrid size={12}>
        <StatusBar
          total={max_hit_points}
          percent={hpPercent}
          current={current_hit_points}
          characterId={id}
          setCharacter={setCharacter}
        />
      </S.CenteredGrid>

      <S.CenteredGrid size={12}>
        <StatusBar
          total={max_sanity_points}
          percent={sanityPercent}
          current={current_sanity_points}
          variant={StatusBarEnum.Sanity}
          characterId={id}
          setCharacter={setCharacter}
        />
      </S.CenteredGrid>

      <S.CenteredGrid size={12}>
        <FormControlLabel control={<Switch color='secondary' />} label='Traumatizado' />
        <FormControlLabel control={<Switch color='secondary' />} label='Morrendo' />
      </S.CenteredGrid>

      {/* Dado para rolagem d100 */}
      <S.CenteredGrid size={6}>
        <Dice width={80} height={80} altText='Dice roll' onClick={() => diceRollModal.appear()} />
      </S.CenteredGrid>
    </S.CenteredGrid>
  );
};

export default CharacterOverview;

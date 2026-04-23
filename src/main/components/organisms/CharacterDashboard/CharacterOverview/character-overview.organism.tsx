import React from 'react';

import { FormControlLabel, Switch } from '@mui/material';
import { characterPicture, ProgressBarHelper } from 'common/helpers';
import { Dice, RoundedImage, StatusBar } from 'main/components/atoms';

import * as S from './character-overview.styles';

const CharacterOverview = ({ character, diceRollModal, hitPointsModal, sanityPointsModal, changePictureModal }) => {
  const { current_hit_points, max_hit_points, current_sanity_points, max_sanity_points } = character;
  const characterPictureURL = characterPicture.getCharacterPictureURL(character);

  const handleImageClick = () => changePictureModal.appear();

  const hpPercent = ProgressBarHelper.Percentage(current_hit_points, max_hit_points);
  const sanityPercent = ProgressBarHelper.Percentage(current_sanity_points, max_sanity_points);

  return (
    <S.CenteredGrid container spacing={3}>
      {/* Imagem do personagem */}
      <S.CenteredGrid size={6}>
        <RoundedImage src={characterPictureURL} width={140} height={140} onClick={handleImageClick} hoverEffect />
      </S.CenteredGrid>

      <S.CenteredGrid size={12}>
        <StatusBar
          percent={hpPercent}
          total={max_hit_points}
          current={current_hit_points}
          onClick={() => hitPointsModal.appear()}
        />
      </S.CenteredGrid>

      <S.CenteredGrid size={12}>
        <StatusBar
          percent={sanityPercent}
          total={max_sanity_points}
          current={current_sanity_points}
          variant='sanity'
          onClick={() => sanityPointsModal.appear()}
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

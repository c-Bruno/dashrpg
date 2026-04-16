import React from 'react';

import { FormControlLabel, Switch } from '@mui/material';
import { characterPicture } from 'common/helpers';
import { Dice } from 'main/components/atoms';
import { StatusBar } from 'main/components/molecules';

import * as S from './character-overview.styles';

const CharacterOverview = ({ character, diceRollModal, hitPointsModal, sanityPointsModal, changePictureModal }) => {
  return (
    <S.CenteredGrid container spacing={3}>
      {/* Imagem do personagem */}
      <S.CenteredGrid size={6}>
        <S.ImageWrapper>
          <S.GlowEffect />
          <S.StyledRoundedImage
            src={characterPicture.getCharacterPictureURL(character)}
            altText='Imagem de jogador'
            width={125}
            height={125}
            onClick={() => changePictureModal.appear()}
          />
        </S.ImageWrapper>
      </S.CenteredGrid>

      {/* Vida do personagem*/}
      <S.CenteredGrid size={12}>
        <StatusBar
          title='Vida'
          current={character.current_hit_points} // Vida Atual
          max={character.max_hit_points} // Vida Total
          label={`${character.current_hit_points}/${character.max_hit_points}`} // Valor exibido em tela
          primaryColor='#640101'
          secondaryColor='#1b1517'
          onClick={() => {
            hitPointsModal.appear();
          }}
        />
      </S.CenteredGrid>

      {/* Sanidade do personagem*/}
      <S.CenteredGrid size={12}>
        <StatusBar
          title='Sanidade'
          current={character.current_sanity_points} // Sanidade Atual
          max={character.max_sanity_points} // Sanidade Total
          label={`${character.current_sanity_points}/${character.max_sanity_points}`} // Valor exibido em tela
          primaryColor='#011B64'
          secondaryColor='#1b1517'
          onClick={() => {
            sanityPointsModal.appear();
          }}
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

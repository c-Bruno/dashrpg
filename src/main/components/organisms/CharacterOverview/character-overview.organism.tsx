import React from 'react';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { getCharacterPicture } from 'common/helpers';
import { StatusBar } from 'main/components/molecules';

import * as S from './character-overview.styles';

const CharacterOverview = ({ character, diceRollModal, hitPointsModal, sanityPointsModal, changePictureModal }) => {
  return (
    <S.CenteredGrid container item spacing={3}>
      {/* Imagem do personagem */}
      <S.CenteredGrid item xs={6}>
        <S.CharacterImage
          src={getCharacterPicture(character)}
          alt='Imagem de jogador'
          width={122}
          height={122}
          onClick={() => changePictureModal.appear()}
        />
      </S.CenteredGrid>

      {/* Vida do personagem*/}
      <S.CenteredGrid item xs={12}>
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
      <S.CenteredGrid item xs={12}>
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

      <S.CenteredGrid item xs={12}>
        <FormControlLabel control={<Switch color='secondary' />} label='Traumatizado' />
        <FormControlLabel control={<Switch color='secondary' />} label='Morrendo' />
      </S.CenteredGrid>

      {/* Dado para rolagem d100 */}
      <S.CenteredGrid item xs={6}>
        <S.Dice
          width={80}
          height={80}
          alt='Dice roll'
          src={'/assets/dice.png'}
          onClick={() => diceRollModal.appear()}
        />
      </S.CenteredGrid>
    </S.CenteredGrid>
  );
};

export default CharacterOverview;

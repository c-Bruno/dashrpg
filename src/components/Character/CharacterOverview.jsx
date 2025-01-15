import React, { useEffect, useState } from 'react';

import { Grid, styled } from '@mui/material';
import { StatusBar, Section } from '..';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Image from 'next/image';

const CharacterOverview = ({
  character,
  diceRollModal,
  hitPointsModal,
  sanityPointsModal,
  changePictureModal,
}) => {
  // Encontra no banco a imagem atual
  const getCharacterPictureURL = () => {
    if (!character) {
      return null;
    }

    if (character.standard_character_picture_url && character.injured_character_picture_url) {
      if (character.current_hit_points > character.max_hit_points / 2) {
        return character.standard_character_picture_url;
      } else {
        return character.injured_character_picture_url;
      }
    } else {
      return `/assets/character.png`;
    }
  };

  return (
    <Grid item xs={12} md={4}>
      <Section>
        <CenteredGrid container item spacing={3}>
          {/* Imagem do personagem */}
          <CenteredGrid item xs={6}>
            <CharacterImage
              src={getCharacterPictureURL()}
              alt='Imagem de jogador'
              width={122}
              height={122}
              onClick={() => changePictureModal.appear()}
            />
          </CenteredGrid>

          {/* Vida do personagem*/}
          <CenteredGrid item xs={12}>
            <Grid container item xs={12} marginBottom={2}>
              <BarTitle item xs={12}>
                <span>Vida</span>
              </BarTitle>
              <Grid item xs={12}>
                <StatusBar
                  current={character.current_hit_points} // Vida Atual
                  max={character.max_hit_points} // Vida Total
                  label={`${character.current_hit_points}/${character.max_hit_points}`} // Valor exibido em tela
                  primaryColor='#640101'
                  secondaryColor='#1b1517'
                  onClick={() => {
                    hitPointsModal.appear();
                  }}
                />
              </Grid>
            </Grid>
          </CenteredGrid>

          {/* Sanidade do personagem*/}
          <CenteredGrid item xs={12}>
            <Grid container item xs={12} marginBottom={2}>
              <BarTitle item xs={12}>
                <span>Sanidade</span>
              </BarTitle>
              <Grid item xs={12}>
                <StatusBar
                  current={character.current_sanity_points} // Sanidade Atual
                  max={character.max_sanity_points} // Sanidade Total
                  label={`${character.current_sanity_points}/${character.max_sanity_points}`} // Valor exibido em tela
                  primaryColor='#011B64'
                  secondaryColor='#1b1517'
                  onClick={() => {
                    sanityPointsModal.appear();
                  }}
                />
              </Grid>
            </Grid>
          </CenteredGrid>

          <CenteredGrid item xs={12}>
            <FormControlLabel control={<Switch color='secondary' />} label='Traumatizado' />
            <FormControlLabel control={<Switch color='secondary' />} label='Morrendo' />
          </CenteredGrid>

          {/* Dado para rolagem d100 */}
          <CenteredGrid item xs={6}>
            <Dice
              width={80}
              height={80}
              alt='Dice roll'
              src={'/assets/dice.png'}
              onClick={() => diceRollModal.appear()}
            />
          </CenteredGrid>
        </CenteredGrid>
      </Section>
    </Grid>
  );
};

const CenteredGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const CharacterImage = styled(Image)(({ theme }) => ({
  width: '200px',
  borderRadius: '50%',
  cursor: 'pointer',
}));

const BarTitle = styled(Grid)(({ theme }) => ({
  marginBottom: '2px',
  color: theme.palette.secondary.main,
  fontSize: '15px',
  fontWeight: 'bold',
}));

const Dice = styled(Image)(({ theme }) => ({
  cursor: 'pointer',
  transition: '-webkit-transform .8s ease-in-out',
  transform: 'transform .8s ease-in-out',

  '&:hover': {
    transition: 'rotate(360deg)',
    transform: 'rotate(360deg)',
  },
}));

export default CharacterOverview;

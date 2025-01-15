import {
  Delete as DeleteIcon,
  Favorite as HeartIcon,
  FavoriteBorder as HeartIconNoLife,
  Link as LinkIcon,
  Chair as SanityIcon,
  ChairAltOutlined as SanityIconEmpty,
} from '@mui/icons-material';
import { Box, Button, styled, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const Root = styled('div')(({ theme }) => ({
  gap: '20px',
  width: '100%',
  display: 'flex',
  padding: '15px',
  minHeight: '121px',
  borderRadius: '5px',
  alignItems: 'center',
  background: theme.palette.primary[900],
}));

const CharacterImage = styled(Image)(({ theme }) => ({
  width: '75px',
  borderRadius: '50%',
}));

const CharacterName = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  marginTop: '8px',
  fontWeight: 'bold',
}));

const CharacterLife = styled(Box)(({ theme }) => ({
  gap: '3px',
  float: 'left',
  display: 'flex',
  color: '#E80A67',
  marginRight: '10px',
  alignItems: 'center',
  justifyContent: 'center',
}));

const CharacterSanity = styled(Box)(({ theme }) => ({
  gap: '3px',
  display: 'flex',
  color: '#1e45b6',
  alignItems: 'center',
  justifyContent: 'center',
}));

const HpInfo = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
}));

const MainInformations = styled(Box)(({ theme }) => ({
  gap: '10px',
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'center',
  flexDirection: 'column',
}));

const Btn = styled(Button)(({ theme }) => ({
  width: 40,
  height: 40,
  minWidth: 40,
  borderRadius: '5px',
}));

const BoxButtons = styled(Box)(({ theme }) => ({
  gap: '10px',
  display: 'flex',
  marginTop: '10px',
  alignItems: 'center',
  justifyContent: 'center',
}));

function CharacterBox({ classes, character, deleteCharacter, ...rest }) {
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
    <Root {...rest}>
      <CharacterImage
        src={getCharacterPictureURL()}
        alt='Character Portrait'
        width={70}
        height={70}
      />
      <MainInformations>
        {/* Nome do personagem */}
        <CharacterName>
          {character.name} (ID: {character.id})
        </CharacterName>

        <div>
          {/* Vida resumida */}
          <CharacterLife>
            {character.current_hit_points === 0 ? <HeartIconNoLife /> : <HeartIcon />}
            <HpInfo>
              {character.current_hit_points}/{character.max_hit_points}
            </HpInfo>
          </CharacterLife>

          {/* Sanidade Resumida resumida */}
          <CharacterSanity>
            {character.current_sanity_points === 0 ? <SanityIconEmpty /> : <SanityIcon />}
            <HpInfo>
              {character.current_sanity_points}/{character.max_sanity_points}
            </HpInfo>
          </CharacterSanity>
        </div>

        <BoxButtons>
          {/* Adicionar novo personagem */}
          <Btn variant='outlined' href={`/sheet/${character.id}`} target='_blank'>
            <LinkIcon />
          </Btn>

          {/* Deletar personagem */}
          <Btn variant='outlined' onClick={() => deleteCharacter(character.id)}>
            <DeleteIcon />
          </Btn>
        </BoxButtons>
      </MainInformations>
    </Root>
  );
}

export default CharacterBox;

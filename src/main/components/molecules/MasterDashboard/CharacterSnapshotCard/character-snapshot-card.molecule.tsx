import React from 'react';

import {
  Delete as DeleteIcon,
  Favorite as HeartIcon,
  FavoriteBorder as HeartIconNoLife,
  Link as LinkIcon,
  Chair as SanityIcon,
  ChairAltOutlined as SanityIconEmpty,
} from '@mui/icons-material';
import { characterPicture } from 'common/helpers';
import { RoundedImage } from 'main/components/atoms';

import * as S from './character-snapshot-card.styles';

interface CharacterSnapshotCardProps {
  character: any;
  deleteCharacter: () => void;
  [key: string]: any; // Permite passar props adicionais
}

const CharacterSnapshotCard: React.FC<CharacterSnapshotCardProps> = ({ character, deleteCharacter, ...rest }) => {
  return (
    <S.CharacterCardContainer {...rest}>
      <RoundedImage
        src={characterPicture.getCharacterPictureURL(character)}
        altText='Default Option'
        width={100}
        height={100}
      />
      <S.CharacterDetails>
        {/* Nome do personagem */}
        <S.CharacterTitle>
          {character.name} (ID: {character.id})
        </S.CharacterTitle>

        <div>
          {/* Vida resumida */}
          <S.HealthStatus>
            {character.current_hit_points === 0 ? <HeartIconNoLife /> : <HeartIcon />}
            <S.StatusInfo>
              {character.current_hit_points}/{character.max_hit_points}
            </S.StatusInfo>
          </S.HealthStatus>

          {/* Sanidade Resumida resumida */}
          <S.SanityStatus>
            {character.current_sanity_points === 0 ? <SanityIconEmpty /> : <SanityIcon />}
            <S.StatusInfo>
              {character.current_sanity_points}/{character.max_sanity_points}
            </S.StatusInfo>
          </S.SanityStatus>
        </div>

        <S.ActionButtonsWrapper>
          {/* Visualizar personagem */}
          <S.ActionButton variant='outlined' onClick={() => window.open(`/sheet/${character.id}`, '_blank')}>
            <LinkIcon />
          </S.ActionButton>

          {/* Deletar personagem */}
          <S.ActionButton variant='outlined' onClick={() => deleteCharacter()}>
            <DeleteIcon />
          </S.ActionButton>
        </S.ActionButtonsWrapper>
      </S.CharacterDetails>
    </S.CharacterCardContainer>
  );
};

export default CharacterSnapshotCard;

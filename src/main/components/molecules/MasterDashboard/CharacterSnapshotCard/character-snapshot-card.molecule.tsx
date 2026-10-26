import type { MouseEvent } from 'react';

import { Delete as DeleteIcon } from '@mui/icons-material';
import { StatusBarEnum } from 'common/enums';
import { characterPicture, ProgressBarHelper } from 'common/helpers';
import { RoundedImage } from 'main/components/atoms';
import { StatusBar } from 'main/components/molecules';

import * as S from './character-snapshot-card.styles';

interface CharacterSnapshotCardProps {
  character: any;
  deleteCharacter: () => void;
  [key: string]: any; // Permite passar props adicionais
}

const CharacterSnapshotCard = ({ character, deleteCharacter, ...rest }: CharacterSnapshotCardProps) => {
  const { current_hit_points, max_hit_points, current_sanity_points, max_sanity_points, occupation } = character;

  const handleCardClick = () => window.open(`/sheet/${character.id}`, '_blank');

  // Handle delete action and stop card click event
  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    deleteCharacter();
  };

  const hpPercent = ProgressBarHelper.Percentage(current_hit_points, max_hit_points);

  const isCritical = hpPercent > 0 && hpPercent <= 25;
  const isDead = current_hit_points === 0;

  return (
    <S.CharacterCardContainer isCritical={isCritical} isDead={isDead} onClick={handleCardClick} {...rest}>
      <RoundedImage src={characterPicture.getCharacterPictureURL(character)} />

      <S.CardContent>
        <S.CardTopRow>
          <S.TitleGroup>
            <S.CharacterTitle>{character.name}</S.CharacterTitle>
            {occupation && <S.CharacterSubtitle>{occupation}</S.CharacterSubtitle>}
          </S.TitleGroup>

          <DeleteIcon fontSize='small' onClick={handleDelete} />
        </S.CardTopRow>

        <S.StatsWrapper>
          <StatusBar total={max_hit_points} current={current_hit_points} />
          <StatusBar total={max_sanity_points} current={current_sanity_points} variant={StatusBarEnum.Sanity} />
        </S.StatsWrapper>
      </S.CardContent>
    </S.CharacterCardContainer>
  );
};

export default CharacterSnapshotCard;

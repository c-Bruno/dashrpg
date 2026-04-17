import { characterPicture } from 'common/helpers';
import { ActionButton, RoundedImage, StatusBar } from 'main/components/atoms';

import * as S from './character-snapshot-card.styles';

interface CharacterSnapshotCardProps {
  character: any;
  deleteCharacter: () => void;
  [key: string]: any; // Permite passar props adicionais
}

const CharacterSnapshotCard = ({ character, deleteCharacter, ...rest }: CharacterSnapshotCardProps) => {
  const { current_hit_points, max_hit_points, current_sanity_points, max_sanity_points } = character;

  const handleCardClick = () => {
    window.open(`/sheet/${character.id}`, '_blank');
  };

  const hpPercent = max_hit_points > 0 ? Math.min(100, Math.round((current_hit_points / max_hit_points) * 100)) : 0;

  const sanityPercent =
    max_sanity_points > 0 ? Math.min(100, Math.round((current_sanity_points / max_sanity_points) * 100)) : 0;

  const isCritical = hpPercent > 0 && hpPercent <= 25;
  const isDead = current_hit_points === 0;

  return (
    <S.CharacterCardContainer isCritical={isCritical} isDead={isDead} {...rest}>
      <RoundedImage
        src={characterPicture.getCharacterPictureURL(character)}
        altText={character.name}
        width={105}
        height={105}
        onClick={handleCardClick}
      />
      <S.CharacterDetails>
        <S.CharacterTitle>{character.name}</S.CharacterTitle>

        <S.StatsWrapper>
          {/* Barra de vida */}
          <StatusBar percent={hpPercent} total={max_hit_points} current={current_hit_points} withIcon />

          {/* Barra de sanidade */}
          <StatusBar
            total={max_sanity_points}
            percent={sanityPercent}
            current={current_sanity_points}
            variant='sanity'
            withIcon
          />
        </S.StatsWrapper>

        <S.ActionButtonsWrapper>
          <ActionButton type='link' tooltip='Ver ficha' onClick={handleCardClick} fontSize='small' outline />
          <ActionButton type='delete' tooltip='Deletar' onClick={deleteCharacter} fontSize='small' outline />
        </S.ActionButtonsWrapper>
      </S.CharacterDetails>
    </S.CharacterCardContainer>
  );
};

export default CharacterSnapshotCard;

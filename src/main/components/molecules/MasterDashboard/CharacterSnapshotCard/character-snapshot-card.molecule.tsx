import { useState } from 'react';
import type { MouseEvent } from 'react';

import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { ListItemText, Menu, MenuItem } from '@mui/material';
import { characterPicture, ProgressBarHelper } from 'common/helpers';
import { RoundedImage, StatusBar } from 'main/components/atoms';

import * as S from './character-snapshot-card.styles';

interface CharacterSnapshotCardProps {
  character: any;
  deleteCharacter: () => void;
  [key: string]: any; // Permite passar props adicionais
}

const CharacterSnapshotCard = ({ character, deleteCharacter, ...rest }: CharacterSnapshotCardProps) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const { current_hit_points, max_hit_points, current_sanity_points, max_sanity_points, occupation } = character;

  const handleCardClick = () => window.open(`/sheet/${character.id}`, '_blank');

  // Open menu and stop card click event
  const handleMenuOpen = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setMenuAnchor(e.currentTarget);
  };

  // Close menu and stop card click event
  const handleMenuClose = (e: MouseEvent) => {
    e.stopPropagation();
    setMenuAnchor(null);
  };

  // Handle delete action and stop card click event
  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    setMenuAnchor(null);
    deleteCharacter();
  };

  const hpPercent = ProgressBarHelper.Percentage(current_hit_points, max_hit_points);
  const sanityPercent = ProgressBarHelper.Percentage(current_sanity_points, max_sanity_points);

  const isCritical = hpPercent > 0 && hpPercent <= 25;
  const isDead = current_hit_points === 0;

  return (
    <S.CharacterCardContainer isCritical={isCritical} isDead={isDead} onClick={handleCardClick} {...rest}>
      <RoundedImage src={characterPicture.getCharacterPictureURL(character)} altText={character.name} />

      <S.CardContent>
        <S.CardTopRow>
          <S.TitleGroup>
            <S.CharacterTitle>{character.name}</S.CharacterTitle>
            {occupation && <S.CharacterSubtitle>{occupation}</S.CharacterSubtitle>}
          </S.TitleGroup>

          <S.MenuButton onClick={handleMenuOpen} size='small'>
            <MoreVertIcon fontSize='small' />
          </S.MenuButton>
        </S.CardTopRow>

        <S.StatsWrapper>
          <StatusBar percent={hpPercent} total={max_hit_points} current={current_hit_points} withIcon />
          <StatusBar
            percent={sanityPercent}
            total={max_sanity_points}
            current={current_sanity_points}
            variant='sanity'
            withIcon
          />
        </S.StatsWrapper>
      </S.CardContent>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MenuItem onClick={handleDelete} sx={{ color: '#ff3d7f' }}>
          <ListItemText>Deletar personagem</ListItemText>
        </MenuItem>
      </Menu>
    </S.CharacterCardContainer>
  );
};

export default CharacterSnapshotCard;

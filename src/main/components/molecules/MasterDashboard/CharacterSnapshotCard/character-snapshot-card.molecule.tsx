import { useState } from 'react';
import type { MouseEvent } from 'react';

import { Delete as DeleteIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { characterPicture } from 'common/helpers';
import { RoundedImage, StatusBar } from 'main/components/atoms';

import * as S from './character-snapshot-card.styles';

interface CharacterSnapshotCardProps {
  character: any;
  deleteCharacter: () => void;
  [key: string]: any; // Permite passar props adicionais
}

const CharacterSnapshotCard = ({ character, deleteCharacter, ...rest }: CharacterSnapshotCardProps) => {
  const { current_hit_points, max_hit_points, current_sanity_points, max_sanity_points, occupation } = character;
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleCardClick = () => {
    window.open(`/sheet/${character.id}`, '_blank');
  };

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

  const hpPercent = max_hit_points > 0 ? Math.min(100, Math.round((current_hit_points / max_hit_points) * 100)) : 0;
  const sanityPercent =
    max_sanity_points > 0 ? Math.min(100, Math.round((current_sanity_points / max_sanity_points) * 100)) : 0;

  const isCritical = hpPercent > 0 && hpPercent <= 25;
  const isDead = current_hit_points === 0;

  return (
    <S.CharacterCardContainer isCritical={isCritical} isDead={isDead} onClick={handleCardClick} {...rest}>
      <S.AvatarWrapper>
        <RoundedImage src={characterPicture.getCharacterPictureURL(character)} altText={character.name} />
      </S.AvatarWrapper>

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
          <ListItemIcon>
            <DeleteIcon fontSize='small' sx={{ color: '#ff3d7f' }} />
          </ListItemIcon>
          <ListItemText>Deletar personagem</ListItemText>
        </MenuItem>
      </Menu>
    </S.CharacterCardContainer>
  );
};

export default CharacterSnapshotCard;

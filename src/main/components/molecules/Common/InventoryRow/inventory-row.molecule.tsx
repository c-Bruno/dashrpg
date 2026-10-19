import { Delete as DeleteIcon } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import * as S from './inventory-row.styles';

interface InventoryRowProps {
  item: any;
  isWeapon: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const getItemIcon = (description: string, isWeapon: boolean) => {
  if (/arco|besta/.test(description)) return '🏹';
  if (isWeapon) return '🗡️';
  if (/po[cç][aã]o|elixir/.test(description)) return '🧪';
  if (/frasco/.test(description)) return '⚗️';
  if (/escudo/.test(description)) return '🛡️';
  if (/cristal|gema|diamante/.test(description)) return '💎';
  if (/pergaminho|mapa|carta/.test(description)) return '📜';
  return '🎒';
};

const InventoryRow = ({ item, isWeapon, onEdit, onDelete }: InventoryRowProps) => {
  const description = item.inventory.description?.toLowerCase() ?? '';
  const itemIcon = getItemIcon(description, isWeapon);

  return (
    <S.Row>
      <S.ItemButton type='button' onClick={onEdit} aria-label={`Editar ${item.inventory.description}`}>
        <S.ItemIcon aria-hidden='true'>{itemIcon}</S.ItemIcon>
        <S.NameBlock>
          <S.ItemName>{item.inventory.description}</S.ItemName>
          {isWeapon && <S.WeaponBadge label='ARMA' size='small' />}
        </S.NameBlock>
        <S.WeightBadge>{item.inventory.weight} kg</S.WeightBadge>
      </S.ItemButton>

      <Tooltip title='Excluir item'>
        <IconButton aria-label={`Excluir ${item.inventory.description}`} size='small' onClick={onDelete}>
          <DeleteIcon fontSize='small' />
        </IconButton>
      </Tooltip>
    </S.Row>
  );
};

export default InventoryRow;

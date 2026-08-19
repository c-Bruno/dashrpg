import { Delete as DeleteIcon, Create as EditIcon } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import * as S from './inventory-row.styles';

interface InventoryRowProps {
  item: any;
  isWeapon: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const InventoryRow = ({ item, isWeapon, onEdit, onDelete }: InventoryRowProps) => {
  return (
    <S.Row>
      <S.ItemIcon>{isWeapon ? '⚔️' : '🎒'}</S.ItemIcon>

      <S.NameBlock>
        <S.ItemName>{item.inventory.description}</S.ItemName>
        {isWeapon && <S.WeaponBadge label='ARMA' size='small' />}
      </S.NameBlock>

      <S.WeightBadge>{item.inventory.weight} peso</S.WeightBadge>

      <S.Actions>
        <Tooltip title='Editar'>
          <IconButton size='small' onClick={onEdit}>
            <EditIcon fontSize='small' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Remover'>
          <IconButton size='small' color='error' onClick={onDelete}>
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      </S.Actions>
    </S.Row>
  );
};

export default InventoryRow;

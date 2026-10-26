import { Grid, TextField } from '@mui/material';
import { ModalTemplate } from 'main/components/templates';

import * as S from './inventory-modal.styles';
import { InventoryData, WEAPON_TYPES } from './inventory.helper';
import useInventorySubmit from './use-inventory-submit.hook';
import WeaponFields from './weapon-fields.molecule';

interface InventoryModalProps {
  data: InventoryData | null;
  onSubmit: (character: unknown) => void;
  operation: 'create' | 'edit';
  character: number;
  totalSpace: number;
  handleClose: () => void;
  fullCharacter: any;
}

const InventoryModal = (props: InventoryModalProps) => {
  const { inventory, isWeapon, setIsWeapon, combat, updateInventoryField, updateCombatField, submit, isLoading } =
    useInventorySubmit(props);

  const selectedType = WEAPON_TYPES.find((t) => t.value === combat.type);

  return (
    <ModalTemplate
      title={props.operation === 'create' ? '📦 Adicionar item' : '📦 Editar item'}
      onClose={props.handleClose}
      onConfirm={submit}
      disableConfirm={!inventory.description || isLoading}
      maxWidth='sm'>
      <S.WeaponPreview>
        <S.WeaponIcon>{selectedType?.icon ?? '🎒​'}</S.WeaponIcon>
        <S.WeaponName>{combat.weapon || inventory.description || ''}</S.WeaponName>
        <S.WeaponTypeBadge label={selectedType?.label ?? 'Item'} size='small' />
      </S.WeaponPreview>

      <Grid container spacing={2} sx={{ pt: 1 }}>
        <Grid size={12}>
          <TextField
            autoFocus
            fullWidth
            label='Descrição'
            variant='standard'
            autoComplete='off'
            value={inventory.description}
            onChange={updateInventoryField('description')}
          />
        </Grid>

        <Grid size={12}>
          <TextField
            fullWidth
            label='Peso'
            type='number'
            variant='standard'
            autoComplete='off'
            value={inventory.weight || ''}
            onChange={updateInventoryField('weight')}
            slotProps={{ htmlInput: { min: 0, step: 0.1 } }}
          />
        </Grid>

        <Grid size={12}>
          <S.WeaponToggleRow>
            <S.WeaponToggleLabel>⚔ É uma arma?</S.WeaponToggleLabel>
            <S.GoldSwitch checked={isWeapon} onChange={(e) => setIsWeapon(e.target.checked)} size='small' />
          </S.WeaponToggleRow>
        </Grid>

        {isWeapon && <WeaponFields combat={combat} onChange={updateCombatField} />}
      </Grid>
    </ModalTemplate>
  );
};

export default InventoryModal;

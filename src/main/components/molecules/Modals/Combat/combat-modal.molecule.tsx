import { useEffect, useState, ChangeEvent } from 'react';
import { toast } from 'react-toastify';

import { Grid, MenuItem, TextField } from '@mui/material';
import { api } from 'common/libs';
import { ModalTemplate } from 'main/components/templates';

import * as S from './combat-modal.styles';

interface CombatData {
  id?: number;
  weapon: string;
  type: string;
  damage: string;
  current_load: string | number;
  total_load: string | number;
}

interface CombatModalProps {
  data: CombatData | null;
  onSubmit: (character: unknown) => void;
  operation: 'create' | 'edit';
  character: number;
  handleClose: () => void;
  fullCharacter: any;
}

const WEAPON_TYPES = [
  { value: 'Balistico', label: 'Balístico', icon: '🔫' },
  { value: 'Fisico', label: 'Físico', icon: '⚔️' },
  { value: 'Fogo', label: 'Fogo', icon: '🔥' },
];

const buildEmpty = (characterId: number) => ({
  weapon: '',
  type: '',
  damage: '',
  current_load: '',
  total_load: '',
  character_id: characterId,
});

const CombatModal = ({ data, onSubmit, operation, character, handleClose, fullCharacter }: CombatModalProps) => {
  const [combat, setCombat] = useState(() => (data ? { ...data, character_id: character } : buildEmpty(character)));

  useEffect(() => {
    setCombat(data ? { ...data, character_id: character } : buildEmpty(character));
  }, [data, character]);

  const update = (field: string) => (e: ChangeEvent<HTMLInputElement>) =>
    setCombat((prev) => ({ ...prev, [field]: e.target.value }));

  const submit = async () => {
    if (!combat.weapon) return;

    try {
      if (operation === 'create') {
        await api.post('/combat', combat);
        const response = await api.get('/combat/');
        const newId = Math.max(...(response.data as { id: number }[]).map((v) => v.id));
        const updated = { ...fullCharacter, combat: [...fullCharacter.combat, { combat_id: newId, combat }] };
        onSubmit(updated);
      } else {
        await api.put(`/combat/${data!.id}`, combat);
        const updated = {
          ...fullCharacter,
          combat: fullCharacter.combat.map((item) => (item.combat_id === data!.id ? { ...item, combat } : item)),
        };
        onSubmit(updated);
      }
      handleClose();
    } catch {
      toast.error(operation === 'create' ? 'Erro ao criar o item!' : 'Erro ao editar o item!');
    }
  };

  const selectedType = WEAPON_TYPES.find((t) => t.value === combat.type);

  return (
    <ModalTemplate
      title={operation === 'create' ? '⚔ Adicionar arma' : '⚔ Editar arma'}
      onClose={handleClose}
      onConfirm={submit}
      disableConfirm={!combat.weapon}
      maxWidth='sm'>
      <S.WeaponPreview>
        <S.WeaponIcon>{selectedType?.icon ?? '🗡️'}</S.WeaponIcon>
        <S.WeaponName>{combat.weapon ?? ''}</S.WeaponName>
        <S.WeaponTypeBadge label={selectedType?.label ?? '—'} size='small' className={selectedType ? '' : 'hidden'} />
      </S.WeaponPreview>

      <Grid container spacing={3} sx={{ pt: 1.5 }}>
        <Grid size={12}>
          <TextField
            fullWidth
            autoFocus
            label='Nome da arma'
            variant='standard'
            autoComplete='off'
            value={combat.weapon}
            onChange={update('weapon')}
          />
        </Grid>

        <Grid size={12}>
          <TextField
            select
            fullWidth
            label='Tipo da arma'
            variant='standard'
            value={combat.type}
            onChange={update('type')}>
            {WEAPON_TYPES.map(({ value, label, icon }) => (
              <MenuItem key={value} value={value}>
                {icon} {label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={4}>
          <TextField
            fullWidth
            label='Dano'
            variant='standard'
            autoComplete='off'
            placeholder='ex: 2d6'
            value={combat.damage}
            onChange={update('damage')}
          />
        </Grid>

        <Grid size={4}>
          <TextField
            fullWidth
            type='number'
            label='Carga Atual'
            variant='standard'
            autoComplete='off'
            value={combat.current_load}
            onChange={update('current_load')}
          />
        </Grid>

        <Grid size={4}>
          <TextField
            fullWidth
            type='number'
            label='Carga Máxima'
            variant='standard'
            autoComplete='off'
            value={combat.total_load}
            onChange={update('total_load')}
          />
        </Grid>
      </Grid>
    </ModalTemplate>
  );
};

export default CombatModal;

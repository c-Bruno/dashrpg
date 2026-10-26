import { ChangeEvent } from 'react';

import { Grid, MenuItem, TextField } from '@mui/material';
import { SectionDivider } from 'main/components/atoms';

import { CombatPayload, WEAPON_TYPES } from './inventory.helper';

interface WeaponFieldsProps {
  combat: CombatPayload;
  onChange: (field: keyof Omit<CombatPayload, 'character_id'>) => (e: ChangeEvent<HTMLInputElement>) => void;
}

const WeaponFields = ({ combat, onChange }: WeaponFieldsProps) => (
  <>
    <SectionDivider label='Atributos de combate' />

    <Grid size={12}>
      <TextField
        fullWidth
        label='Nome da arma'
        variant='standard'
        autoComplete='off'
        value={combat.weapon}
        onChange={onChange('weapon')}
      />
    </Grid>

    <Grid size={12}>
      <TextField
        select
        fullWidth
        label='Tipo da arma'
        variant='standard'
        value={combat.type}
        onChange={onChange('type')}>
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
        onChange={onChange('damage')}
      />
    </Grid>

    <Grid size={4}>
      <TextField
        fullWidth
        label='Carga atual'
        type='number'
        variant='standard'
        autoComplete='off'
        value={combat.current_load}
        onChange={onChange('current_load')}
      />
    </Grid>

    <Grid size={4}>
      <TextField
        fullWidth
        label='Carga máx.'
        type='number'
        variant='standard'
        autoComplete='off'
        value={combat.total_load}
        onChange={onChange('total_load')}
      />
    </Grid>
  </>
);

export default WeaponFields;

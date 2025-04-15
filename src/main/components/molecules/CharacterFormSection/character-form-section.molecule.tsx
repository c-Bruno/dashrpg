import React from 'react';

import { Grid } from '@mui/material';
import { TextFieldInput } from 'main/components/atoms';

interface CharacterFormSectionProps {
  label: string;
  name: string;
  value: string | number;
  error: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  xs?: number;
}

const CharacterFormSection: React.FC<CharacterFormSectionProps> = ({
  label,
  name,
  value,
  error,
  onChange,
  type,
  xs,
}) => (
  <Grid item xs={xs || 12}>
    <TextFieldInput name={name} label={label} value={value} error={error} onChange={onChange} type={type} />
  </Grid>
);

export default CharacterFormSection;

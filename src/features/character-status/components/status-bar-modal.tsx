import { useState } from 'react';

import { Alert, Grid, Typography, TextField } from '@mui/material';
import { StatusBarEnum } from 'common/enums';
import { ModalDialog } from 'design-system/ui';

type StatusValues = { current: number; max: number };

interface StatusBarModalProps {
  handleClose: () => void;
  onSubmit: (data: StatusValues) => Promise<void>;
  data: StatusValues;
  type: StatusBarEnum;
  errorMessage?: string;
}

const StatusBarModal = ({ handleClose, onSubmit, data, type, errorMessage }: StatusBarModalProps) => {
  const [newData, setNewData] = useState({ current: String(data.current), max: String(data.max) });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isValidNumber = (value: string) => value.trim() !== '' && Number.isInteger(Number(value));
  const isValid = isValidNumber(newData.current) && isValidNumber(newData.max);

  const handleSubmit = async () => {
    if (!isValid || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onSubmit({ current: Number(newData.current), max: Number(newData.max) });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof StatusValues, value: string) =>
    setNewData((prev) => ({ ...prev, [field]: value }));

  const getTitle = () => {
    switch (type) {
      case StatusBarEnum.Life:
        return '❤️ Modificador de Vida';
      case StatusBarEnum.Sanity:
        return '🧠 Modificador de Sanidade';
      default:
        return '🛡️ Modificador de Pontos';
    }
  };

  return (
    <ModalDialog
      title={getTitle()}
      onClose={handleClose}
      onConfirm={handleSubmit}
      disableConfirm={!isValid || isSubmitting}
      disableClose={isSubmitting}>
      {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
      <Grid container spacing={3} sx={{ m: 3 }}>
        <Typography variant='body2'>Atualize os valores conforme necessário. Não deixe campos em branco!</Typography>

        <TextField
          fullWidth
          type='number'
          name='current'
          label='Valor Atual'
          value={newData.current}
          variant='standard'
          disabled={isSubmitting}
          error={!isValidNumber(newData.current)}
          helperText={!isValidNumber(newData.current) ? 'Informe um número inteiro.' : undefined}
          onChange={(e) => handleInputChange('current', e.target.value)}
        />

        <TextField
          fullWidth
          name='max'
          type='number'
          label='Valor Máximo'
          value={newData.max}
          variant='standard'
          disabled={isSubmitting}
          error={!isValidNumber(newData.max)}
          helperText={!isValidNumber(newData.max) ? 'Informe um número inteiro.' : undefined}
          onChange={(e) => handleInputChange('max', e.target.value)}
        />
      </Grid>
    </ModalDialog>
  );
};

export default StatusBarModal;

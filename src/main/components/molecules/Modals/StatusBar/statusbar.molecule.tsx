import React, { useState, useEffect } from 'react';

import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Button, Typography, Box } from '@mui/material';
import { TextFieldInput } from 'main/components/atoms';

function StatusBarModal({ handleClose, onSubmit, data, type }) {
  const [newData, setNewData] = useState({ current: '', max: '' });

  useEffect(() => {
    if (data) {
      setNewData({
        current: data.current.toString(),
        max: data.max.toString(),
      });
    }
  }, [data]);

  const resetState = () => {
    setNewData({ current: '', max: '' });
  };

  const submit = () => {
    if (!newData.current || !newData.max) return;

    const payload = {
      current: Number(newData.current),
      max: Number(newData.max),
    };

    onSubmit(payload).then(() => resetState());
  };

  const handleInputChange = (field, value) => {
    setNewData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getTitle = () => {
    switch (type) {
      case 'hp':
        return '❤️ Modificador de Vida';
      case 'sn':
        return '🧠 Modificador de Sanidade';
      default:
        return '🛡️ Modificador de Pontos';
    }
  };

  const isSubmitDisabled = !newData.current || !newData.max;

  return (
    <Dialog open onClose={handleClose} maxWidth='xs' fullWidth>
      <DialogTitle>
        <Typography variant='h6' component='div'>
          {getTitle()}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ mb: 3, mt: 1 }}>
          <Typography variant='body2' color='text.secondary'>
            Atualize os valores conforme necessário. Não deixe campos em branco!
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextFieldInput
                name='current'
                label='Valor Atual'
                type='number'
                value={newData.current}
                onChange={(e) => handleInputChange('current', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldInput
                name='max'
                label='Valor Máximo'
                type='number'
                value={newData.max}
                onChange={(e) => handleInputChange('max', e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color='secondary' variant='outlined'>
          Cancelar
        </Button>
        <Button onClick={submit} color='primary' variant='contained' disabled={isSubmitDisabled}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default StatusBarModal;

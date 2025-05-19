import React, { useState, useEffect } from 'react';

import { Grid, Typography, Box, TextField } from '@mui/material';
import { ModalTemplate } from 'main/components/templates';

interface StatusBarModalProps {
  handleClose: () => void;
  onSubmit: any;
  data: any;
  type: string;
}

const StatusBarModal: React.FC<StatusBarModalProps> = ({ handleClose, onSubmit, data, type }) => {
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

  // const isSubmitDisabled = !newData.current || !newData.max;

  return (
    <ModalTemplate title={getTitle()} onClose={handleClose} onConfirm={submit}>
      <Box sx={{ mb: 3, mt: 1 }}>
        <Typography variant='body2' color='text.secondary'>
          Atualize os valores conforme necessário. Não deixe campos em branco!
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type='number'
              name='current'
              label='Valor Atual'
              value={newData.current}
              variant='standard'
              onChange={(e) => handleInputChange('current', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name='max'
              type='number'
              label='Valor Máximo'
              value={newData.max}
              variant='standard'
              onChange={(e) => handleInputChange('max', e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>
    </ModalTemplate>
  );
};

export default StatusBarModal;

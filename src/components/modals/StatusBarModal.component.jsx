import React, { useState, useEffect } from 'react';

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  DialogTitle,
  Button,
} from '@mui/material';

function StatusBarModal({ handleClose, onSubmit, data, type }) {
  const [newData, setNewData] = useState({
    current: 0,
    max: 0,
  });

  useEffect(() => {
    if (!newData) {
      return;
    }

    setNewData({
      current: data.current,
      max: data.max,
    });
  }, [data]);

  const resetState = () => {
    return setNewData({
      current: 0,
      max: 0,
    });
  };

  const submit = () => {
    if (!newData.current || !newData.max) {
      return;
    }

    onSubmit(newData).then(() => resetState());
  };

  const getTitle = () => {
    switch (type) {
      case 'hp':
        return 'Modicador de Vida';
      case 'sn':
        return 'Modificador de Sanidade';
      default:
        return 'Modificador de Pontos';
    }
  };

  return (
    <Dialog maxWidth={false} open={true} onClose={handleClose}>
      <DialogTitle>{getTitle()}</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {/* Valor atual */}
          <Grid item xs={12}>
            <TextField
              style={{
                marginTop: '15px',
              }}
              autoFocus
              label='Atual'
              type='number'
              fullWidth
              variant='standard'
              value={newData.current}
              onChange={({ target }) => {
                const value = target.value;

                setNewData(prevState => ({
                  ...prevState,
                  current: value,
                }));
              }}
              spellCheck={false}
            />
          </Grid>

          {/* Valor maximo */}
          <Grid item xs={12}>
            <TextField
              style={{
                marginTop: '15px',
              }}
              autoFocus
              label='Máximo'
              type='number'
              fullWidth
              variant='standard'
              value={newData.max}
              onChange={({ target }) => {
                const value = target.value;

                setNewData(prevState => ({
                  ...prevState,
                  max: value,
                }));
              }}
              spellCheck={false}
            />
          </Grid>
        </Grid>
      </DialogContent>

      {/* Botões */}
      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          Cancelar
        </Button>
        <Button onClick={submit}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default StatusBarModal;

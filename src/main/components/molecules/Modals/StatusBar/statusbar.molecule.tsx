import { useEffect, useState } from 'react';

import { Grid, Typography, TextField } from '@mui/material';
import { StatusBarEnum } from 'common/enums';
import { ModalTemplate } from 'main/components/templates';

interface StatusBarModalProps {
  handleClose: () => void;
  onSubmit: any;
  data: any;
  type: StatusBarEnum;
}

const StatusBarModal = ({ handleClose, onSubmit, data, type }: StatusBarModalProps) => {
  const [newData, setNewData] = useState({ current: '', max: '' });

  useEffect(() => {
    if (data) setNewData({ current: data.current.toString(), max: data.max.toString() });
  }, [data]);

  const resetState = () => {
    setNewData({ current: '', max: '' });
  };

  const submit = () => {
    if (!newData.current || !newData.max) return;
    onSubmit({ current: Number(newData.current), max: Number(newData.max) }).then(() => resetState());
  };

  const handleInputChange = (field, value) => setNewData((prev) => ({ ...prev, [field]: value }));

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
    <ModalTemplate title={getTitle()} onClose={handleClose} onConfirm={submit}>
      <Grid container spacing={3} sx={{ m: 3 }}>
        <Typography variant='body2'>Atualize os valores conforme necessário. Não deixe campos em branco!</Typography>

        <TextField
          fullWidth
          type='number'
          name='current'
          label='Valor Atual'
          value={newData.current}
          variant='standard'
          onChange={(e) => handleInputChange('current', e.target.value)}
        />

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
    </ModalTemplate>
  );
};

export default StatusBarModal;

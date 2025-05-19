import React, { useState } from 'react';

import { TextField, Grid, Box, Typography } from '@mui/material';
import { api } from 'common/libs';
import { ModalTemplate } from 'main/components/templates';

interface CreateCharacterModalProps {
  handleClose: () => void;
  onCharacterCreated: () => void;
}

const CreateCharacterModal: React.FC<CreateCharacterModalProps> = ({ handleClose, onCharacterCreated }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    if (!name.trim()) {
      setError('Nome é obrigatório!');
      return;
    }

    try {
      setLoading(true);
      await api.post('/character', { name: name.trim() });
      onCharacterCreated();
      handleClose();
      setName('');
    } catch (error) {
      setError('Erro ao criar o personagem!');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCreate();
    }
  };

  const handleCloseModal = () => {
    if (!loading) {
      setName('');
      setError('');
      handleClose();
    }
  };

  // const actions = (
  //   <Button
  //     onClick={handleCreate}
  //     disabled={!name.trim() || loading}
  //     variant='contained'
  //     startIcon={loading && <CircularProgress size={16} />}
  //   >
  //     Confirmar
  //   </Button>
  // );

  return (
    <ModalTemplate
      title='🗿 Criar personagem'
      onClose={handleCloseModal}
      disableClose={loading}
      onConfirm={handleCreate}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ mb: 3, mt: 1 }}>
            <Typography variant='body2' color='text.secondary'>
              Preencha os campos abaixo para criar um novo personagem
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              autoFocus
              label='Nome'
              type='text'
              fullWidth
              variant='standard'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(''); // limpar erro ao digitar
              }}
              error={!!error}
              helperText={error}
              onKeyPress={handleKeyPress}
            />
          </Box>
        </Grid>
      </Grid>
    </ModalTemplate>
  );
};

export default CreateCharacterModal;

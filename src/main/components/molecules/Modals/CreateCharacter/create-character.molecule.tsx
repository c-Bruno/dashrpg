import { useState } from 'react';

import { TextField, Grid, Box, Typography } from '@mui/material';
import { useFetchMutation } from 'common/hooks';
import { api } from 'common/libs';
import { Character } from 'common/types';
import { ModalTemplate } from 'main/components/templates';
import { useDashboardStore } from 'main/store';

interface CreateCharacterModalProps {
  handleClose: () => void;
}

const CreateCharacterModal = ({ handleClose }: CreateCharacterModalProps) => {
  const { addCharacter } = useDashboardStore();

  const [name, setName] = useState('');

  const resetModal = () => {
    setName('');
    handleClose();
  };

  const createCharacter = useFetchMutation((payload: { name: string }) => api.post<Character>('/character', payload), {
    onSuccess: (data: Character) => {
      addCharacter(data);
      resetModal();
    },
  });

  const handleCreate = async () => {
    createCharacter.trigger({ name: name.trim() });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCreate();
    }
  };

  return (
    <ModalTemplate
      title='🗿 Criar personagem'
      onClose={resetModal}
      onConfirm={handleCreate}
      disableConfirm={!name.trim()}
      disableClose={createCharacter.isLoading}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box sx={{ mb: 3, mt: 1 }}>
            <Typography variant='body2' color='text.secondary'>
              Preencha os campos abaixo para criar um novo personagem
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              autoFocus
              label='Nome'
              fullWidth
              value={name}
              variant='standard'
              onKeyPress={handleKeyPress}
              helperText={!name.trim() && 'Nome é obrigatório!'}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
        </Grid>
      </Grid>
    </ModalTemplate>
  );
};

export default CreateCharacterModal;

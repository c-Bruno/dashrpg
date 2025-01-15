import React, { useState } from 'react';

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

import { api } from '../../utils';
import { useTranslation } from 'react-i18next';

function CreateCharacterModal({ handleClose, onCharacterCreated }) {
  const { t } = useTranslation(['masterDashboard']);
  const [character, setCharacter] = useState({
    name: '',
  });

  const resetState = () => {
    return setCharacter({
      name: '',
    });
  };

  const createCharacter = () => {
    if (!character.name) {
      return;
    }

    api
      .post('/character', character)
      .then(() => {
        // Callback
        onCharacterCreated();

        // Close modal
        handleClose();

        resetState();
      })
      .catch(() => {
        alert('Erro ao criar o personagem!');
      });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>{t('createModal.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('createModal.description')}</DialogContentText>
        <TextField
          style={{
            marginTop: '15px',
          }}
          autoFocus
          label={t('createModal.inputs.name')}
          type='text'
          fullWidth
          variant='standard'
          value={character.name}
          onChange={({ target }) => {
            const value = target.value;

            setCharacter(prevState => ({
              ...prevState,
              name: value,
            }));
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          {t('createModal.cancel')}
        </Button>
        <Button onClick={createCharacter}>{t('createModal.create')}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateCharacterModal;

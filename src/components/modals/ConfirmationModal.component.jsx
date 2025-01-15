import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

function ConfirmationModal({ data, text, title, handleClose, onConfirmation }) {
  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          Cancelar
        </Button>
        <Button
          onClick={() => {
            onConfirmation(data);

            handleClose();
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationModal;

import React from 'react';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface ConfirmationModalProps {
  data: any;
  text: string;
  title: string;
  handleClose: () => void;
  onConfirmation: (data: any) => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ data, text, title, handleClose, onConfirmation }) => {
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
};

export default ConfirmationModal;

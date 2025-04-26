import React from 'react';

import { DialogContentText, Button } from '@mui/material';
import { ModalTemplate } from 'main/components/templates';

interface ConfirmationModalProps {
  data: any;
  text: string;
  title: string;
  handleClose: () => void;
  onConfirmation: (data: any) => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ data, text, title, handleClose, onConfirmation }) => {
  const actions = (
    <>
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
    </>
  );

  return (
    <ModalTemplate title={title} onClose={handleClose} actions={actions}>
      <DialogContentText>{text}</DialogContentText>
    </ModalTemplate>
  );
};

export default ConfirmationModal;

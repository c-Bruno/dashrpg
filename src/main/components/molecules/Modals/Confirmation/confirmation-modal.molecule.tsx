import React from 'react';

import { DialogContentText } from '@mui/material';
import { ModalTemplate } from 'main/components/templates';

interface ConfirmationModalProps {
  data: any;
  text: string;
  title: string;
  handleClose: () => void;
  onConfirmation: (data: any) => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ data, text, title, handleClose, onConfirmation }) => {
  const handleConfirm = () => {
    onConfirmation(data);
    handleClose();
  };

  return (
    <ModalTemplate title={title} onClose={handleClose} onConfirm={handleConfirm}>
      <DialogContentText>{text}</DialogContentText>
    </ModalTemplate>
  );
};

export default ConfirmationModal;

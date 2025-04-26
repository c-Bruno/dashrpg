import React from 'react';

import { DialogContentText, Button } from '@mui/material';
import { ModalTemplate } from 'main/components/templates';

interface InfoModalProps {
  handleClose: () => void;
  title: string;
  text: string;
}

const InfoModal: React.FC<InfoModalProps> = ({ handleClose, title, text }) => {
  const actions = (
    <Button onClick={handleClose} color='secondary'>
      Ok
    </Button>
  );

  return (
    <ModalTemplate title={title} onClose={handleClose} actions={actions}>
      <DialogContentText>{text || '*** Este item não possui informações adicionais ***'}</DialogContentText>
    </ModalTemplate>
  );
};

export default InfoModal;

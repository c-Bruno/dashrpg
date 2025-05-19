import React from 'react';

import { DialogContentText } from '@mui/material';
import { ModalTemplate } from 'main/components/templates';

interface InfoModalProps {
  handleClose: () => void;
  title: string;
  text: string;
}

const InfoModal: React.FC<InfoModalProps> = ({ handleClose, title, text }) => {
  return (
    <ModalTemplate title={title} onClose={handleClose}>
      <DialogContentText>{text || '*** Este item não possui informações adicionais ***'}</DialogContentText>
    </ModalTemplate>
  );
};

export default InfoModal;

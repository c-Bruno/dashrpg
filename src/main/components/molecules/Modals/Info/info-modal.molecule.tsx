
import { DialogContentText } from '@mui/material';
import { ModalTemplate } from 'main/components/templates';

interface InfoModalProps {
  handleClose: () => void;
  title: string;
  text: string;
}

const InfoModal = ({ handleClose, title, text }: InfoModalProps) => {
  return (
    <ModalTemplate title={title} onClose={handleClose}>
      <DialogContentText>{text || '*** Este item não possui informações adicionais ***'}</DialogContentText>
    </ModalTemplate>
  );
};

export default InfoModal;

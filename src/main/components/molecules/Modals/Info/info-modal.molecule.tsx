import { DialogContentText } from '@mui/material';
import { useFetchMutation } from 'common/hooks';
import { api } from 'common/libs';
import { RemoveItemRequest, RemoveItemResponse } from 'core/services/Master/dashboard.interface';
import { ConfirmationDialog, ModalDialog } from 'design-system/ui';
import { useDashboardStore } from 'main/store';

interface InfoModalProps {
  data?: any;
  title: string;
  text: string;
  showConfirm?: boolean;
  handleClose: () => void;
  onConfirmation?: (data: any) => void;
}

const InfoModal = ({ data, title, text, showConfirm, handleClose, onConfirmation }: InfoModalProps) => {
  const { removeAttribute, removeSkill, removeCharacter } = useDashboardStore();
  const removeItemMap = { removeAttribute, removeSkill, removeCharacter };

  const { trigger } = useFetchMutation((params: RemoveItemRequest) => api.delete(`/${params.type}/${params.id}`), {
    onSuccess: (data: RemoveItemResponse) => removeItemMap[data.callback]?.(data.id),
    onError: () => alert('Erro ao remover item!'),
  });

  const handleConfirm = () => {
    if (onConfirmation) onConfirmation?.(data);
    else void trigger({ type: data.type, id: data.id });

    handleClose();
  };

  if (showConfirm) {
    return (
      <ConfirmationDialog
        title={title}
        message={text || '*** Este item não possui informações adicionais ***'}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    );
  }

  return (
    <ModalDialog title={title} onClose={handleClose} closeLabel='Fechar'>
      <DialogContentText>{text || '*** Este item não possui informações adicionais ***'}</DialogContentText>
    </ModalDialog>
  );
};

export default InfoModal;

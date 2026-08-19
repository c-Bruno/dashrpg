import { DialogContentText } from '@mui/material';
import { useFetchMutation } from 'common/hooks';
import { api } from 'common/libs';
import { RemoveItemRequest, RemoveItemResponse } from 'core/services/Master/dashboard.interface';
import { ModalTemplate } from 'main/components/templates';
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
    else trigger({ type: data.type, id: data.id });

    handleClose();
  };

  return (
    <ModalTemplate title={title} onClose={handleClose} onConfirm={showConfirm ? handleConfirm : undefined}>
      <DialogContentText>{text || '*** Este item não possui informações adicionais ***'}</DialogContentText>
    </ModalTemplate>
  );
};

export default InfoModal;

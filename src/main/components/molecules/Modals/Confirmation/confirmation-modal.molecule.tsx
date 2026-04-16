
import { DialogContentText } from '@mui/material';
import { useFetchMutation } from 'common/hooks';
import { api } from 'common/libs';
import { RemoveItemRequest, RemoveItemResponse } from 'core/services/Master/dashboard.interface';
import { ModalTemplate } from 'main/components/templates';
import { useDashboardStore } from 'main/store';

interface ConfirmationModalProps {
  data: any;
  text: string;
  title: string;
  handleClose: () => void;
  onConfirmation?: (data: any) => void;
}

const ConfirmationModal = ({ data, text, title, handleClose, onConfirmation }: ConfirmationModalProps) => {
  const { removeAttribute, removeSkill, removeCharacter } = useDashboardStore();
  const removeItemMap = { removeAttribute, removeSkill, removeCharacter };

  // Use fetch mutation to remove characters, attributes and skills
  const removeItem = useFetchMutation((params: RemoveItemRequest) => api.delete(`/${params.type}/${params.id}`), {
    onSuccess: (data: RemoveItemResponse) => removeItemMap[data.callback]?.(data.id),
    onError: () => alert('Erro ao remover item!'),
  });

  const handleConfirm = () => {
    if (onConfirmation) onConfirmation(data);
    else removeItem.trigger({ type: data.type, id: data.id });

    handleClose();
  };

  return (
    <ModalTemplate title={title} onClose={handleClose} onConfirm={handleConfirm}>
      <DialogContentText>{text}</DialogContentText>
    </ModalTemplate>
  );
};

export default ConfirmationModal;

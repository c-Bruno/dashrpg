import { useState } from 'react';

import DashboardIcon from '../dashboard-icon/dashboard-icon';
import ModalDialog from '../modal-dialog/modal-dialog';
import * as S from './confirmation-dialog.styles';

interface ConfirmationDialogProps {
  title: string;
  message: string;
  description?: string;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  closeLabel?: string;
  confirmLabel?: string;
}

const ConfirmationDialog = ({
  title,
  message,
  description,
  onClose,
  onConfirm,
  closeLabel = 'Fechar',
  confirmLabel = 'Confirmar',
}: ConfirmationDialogProps) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      await onConfirm();
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <ModalDialog
      title={title}
      titleIcon={<DashboardIcon name='warning' size={28} />}
      onClose={onClose}
      onConfirm={handleConfirm}
      disableClose={isConfirming}
      disableConfirm={isConfirming}
      closeLabel={closeLabel}
      confirmLabel={confirmLabel}
      showCloseButton
      maxWidth='sm'
      contentSx={{ marginTop: 0, padding: 0 }}>
      <S.Content>
        <S.Divider aria-hidden='true'>
          <S.WarningMark width={60} height={60} viewBox='0 0 24 24' role='img' aria-label='Atenção'>
            <path
              fill='currentColor'
              fillRule='evenodd'
              d='M8 1h8v2h4v4h2v10h-2v4h-4v2H8v-2H4v-4H2V7h2V3h4zm0 4H6v2H4v10h2v2h2v2h8v-2h2v-2h2V7h-2V5h-2V3H8zm3 1h2v7h-2zm0 9h2v2h-2z'
            />
          </S.WarningMark>
        </S.Divider>
        <S.Message>{message}</S.Message>
        {description && <S.Description>{description}</S.Description>}
      </S.Content>
    </ModalDialog>
  );
};

export default ConfirmationDialog;

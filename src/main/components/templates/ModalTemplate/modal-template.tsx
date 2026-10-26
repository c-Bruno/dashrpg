import { ReactNode } from 'react';

import { Button, Dialog, DialogContent } from '@mui/material';

import * as S from './modal-template.styles';

interface ModalTemplateProps {
  title?: string;
  children: ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  disableClose?: boolean;
  disableConfirm?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

const ModalTemplate = ({
  title,
  children,
  onClose,
  onConfirm,
  disableClose = false,
  disableConfirm = false,
  maxWidth,
}: ModalTemplateProps) => {
  return (
    <Dialog open={true} onClose={onClose} maxWidth={maxWidth} fullWidth slotProps={{ paper: { sx: S.paperSx } }}>
      {title && <S.Title>{title}</S.Title>}

      <S.Container>{children}</S.Container>
      <S.Actions>
        <Button onClick={onClose} color='secondary' variant='outlined' disabled={disableClose} sx={{ borderRadius: 5 }}>
          Fechar
        </Button>
        {onConfirm && (
          <Button onClick={onConfirm} variant='contained' disabled={disableConfirm} sx={{ borderRadius: 5 }}>
            Confirmar
          </Button>
        )}
      </S.Actions>
    </Dialog>
  );
};

export default ModalTemplate;

import { ReactNode } from 'react';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

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
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: 5 } } }}>
      {title && <DialogTitle>{title}</DialogTitle>}

      <DialogContent dividers={!!title}>{children}</DialogContent>
      <DialogActions sx={{ mt: 2, mb: 2, mr: 2 }}>
        <Button onClick={onClose} color='secondary' variant='outlined' disabled={disableClose} sx={{ borderRadius: 5 }}>
          Fechar
        </Button>
        {onConfirm && (
          <Button onClick={onConfirm} variant='contained' disabled={disableConfirm} sx={{ borderRadius: 5 }}>
            Confirmar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ModalTemplate;

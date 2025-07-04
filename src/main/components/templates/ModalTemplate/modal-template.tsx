import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface ModalTemplateProps {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  disableClose?: boolean;
  disableConfirm?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

const ModalTemplate: React.FC<ModalTemplateProps> = ({
  title,
  children,
  onClose,
  onConfirm,
  disableClose = false,
  disableConfirm = false,
  maxWidth,
}) => {
  return (
    <Dialog open={true} onClose={onClose} maxWidth={maxWidth} fullWidth>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent dividers={!!title}>{children}</DialogContent>
      <DialogActions sx={{ mt: 1.2, mb: 1.2, mr: 2 }}>
        <Button onClick={onClose} color='secondary' variant='outlined' disabled={disableClose}>
          Fechar
        </Button>
        {onConfirm && (
          <Button onClick={onConfirm} variant='contained' disabled={disableConfirm}>
            Confirmar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ModalTemplate;

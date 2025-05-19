import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface ModalTemplateProps {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  disableClose?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

const ModalTemplate: React.FC<ModalTemplateProps> = ({
  title,
  children,
  onClose,
  onConfirm,
  disableClose = false,
  maxWidth,
}) => {
  const handleClose = () => {
    if (!disableClose) {
      onClose();
    }
  };

  return (
    <Dialog open={true} onClose={handleClose} maxWidth={maxWidth} fullWidth>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent dividers={!!title}>{children}</DialogContent>
      <DialogActions sx={{ mt: 1.2, mb: 1.2, mr: 2 }}>
        <Button onClick={handleClose} color='secondary' variant='outlined'>
          Fechar
        </Button>
        {onConfirm && (
          <Button onClick={onConfirm} variant='contained'>
            Confirmar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ModalTemplate;

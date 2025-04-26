import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

interface ModalTemplateProps {
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  onClose: () => void;
  disableClose?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

const ModalTemplate: React.FC<ModalTemplateProps> = ({
  title,
  children,
  actions,
  onClose,
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
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default ModalTemplate;

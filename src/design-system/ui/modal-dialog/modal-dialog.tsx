import { useId } from 'react';
import type { ReactNode } from 'react';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog } from '@mui/material';
import type { CSSObject } from '@mui/material/styles';

import * as S from './modal-dialog.styles';

interface ModalDialogProps {
  title?: string;
  titleIcon?: ReactNode;
  children: ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  disableClose?: boolean;
  disableConfirm?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  closeLabel?: string;
  confirmLabel?: string;
  showCloseButton?: boolean;
  showConfirmIcon?: boolean;
  contentSx?: CSSObject;
  paperSx?: CSSObject;
  actionsSx?: CSSObject;
}

const ModalDialog = ({
  title,
  titleIcon,
  children,
  onClose,
  onConfirm,
  disableClose = false,
  disableConfirm = false,
  maxWidth,
  closeLabel = 'Fechar',
  confirmLabel = 'Confirmar',
  showCloseButton = false,
  showConfirmIcon = false,
  contentSx,
  paperSx,
  actionsSx,
}: ModalDialogProps) => {
  const titleId = useId();

  return (
    <Dialog
      open
      onClose={disableClose ? undefined : onClose}
      maxWidth={maxWidth}
      fullWidth
      aria-labelledby={title ? titleId : undefined}
      slotProps={{ paper: { sx: paperSx ? { ...S.paper, ...paperSx } : S.paper } }}>
      {title && (
        <S.TitleArea>
          <S.Title id={titleId} hasIcon={Boolean(titleIcon)}>
            {titleIcon && <S.TitleIcon>{titleIcon}</S.TitleIcon>}
            <S.TitleText>{title}</S.TitleText>
          </S.Title>
          {showCloseButton && (
            <S.CloseButton aria-label='Fechar modal' onClick={onClose} disabled={disableClose} size='small'>
              <CloseIcon fontSize='small' />
            </S.CloseButton>
          )}
        </S.TitleArea>
      )}

      <S.Content sx={contentSx}>{children}</S.Content>
      {(onConfirm || closeLabel) && (
        <S.Actions sx={actionsSx}>
          {closeLabel && (
            <Button onClick={onClose} color='secondary' variant='outlined' disabled={disableClose}>
              {closeLabel}
            </Button>
          )}
          {onConfirm && (
            <Button
              onClick={onConfirm}
              variant='contained'
              disabled={disableConfirm}
              startIcon={showConfirmIcon ? <AddIcon fontSize='small' /> : undefined}>
              {confirmLabel}
            </Button>
          )}
        </S.Actions>
      )}
    </Dialog>
  );
};

export default ModalDialog;

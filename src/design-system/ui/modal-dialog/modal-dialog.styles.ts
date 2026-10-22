import { DialogActions, DialogContent, DialogTitle, IconButton, styled } from '@mui/material';

const GOLD_BORDER = '1px solid rgba(201, 168, 76, 0.35)';
const GOLD_DIVIDER = '1px solid rgba(201, 168, 76, 0.2)';

export const paper = {
  borderRadius: 2,
  border: GOLD_BORDER,
  background: 'linear-gradient(160deg, #1c1c1e 0%, #111113 100%)',
  boxShadow: '0 0 50px rgba(201, 168, 76, 0.08), 0 25px 60px rgba(0,0,0,0.9)',
  overflow: 'hidden',
} as const;

export const TitleArea = styled('div')({
  position: 'relative',
});

export const Title = styled(DialogTitle, {
  shouldForwardProp: (prop) => prop !== 'hasIcon',
})<{ hasIcon: boolean }>(({ hasIcon }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: hasIcon ? 'flex-start' : 'center',
  fontSize: '0.85rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  color: 'rgba(201, 168, 76, 0.9)',
  textAlign: hasIcon ? 'left' : 'center',
  padding: '18px 24px',
  borderBottom: GOLD_DIVIDER,
  background: 'rgba(201, 168, 76, 0.04)',
}));

export const TitleIcon = styled('span')({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'inherit',
  marginRight: 16,
});

export const TitleText = styled('span')({
  flex: 1,
});

export const CloseButton = styled(IconButton)({
  position: 'absolute',
  right: 16,
  top: '50%',
  transform: 'translateY(-50%)',
  color: 'rgba(232, 213, 172, 0.85)',
  '&:hover': {
    color: '#e8b860',
    backgroundColor: 'rgba(201, 168, 76, 0.08)',
  },
});

export const Content = styled(DialogContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(5, 8),
  marginTop: theme.spacing(5),
}));

export const Actions = styled(DialogActions)({
  gap: 12,
  padding: '12px 20px',
  borderTop: GOLD_DIVIDER,
  '& .MuiButton-root': {
    borderRadius: 2,
  },
  '& .MuiButton-startIcon': {
    marginRight: 8,
  },
});

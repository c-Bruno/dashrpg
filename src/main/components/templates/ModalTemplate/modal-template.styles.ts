import { DialogActions, DialogContent, DialogTitle, styled } from '@mui/material';

const GOLD_BORDER = '1px solid rgba(201, 168, 76, 0.35)';
const GOLD_DIVIDER = '1px solid rgba(201, 168, 76, 0.2)';

export const Container = styled(DialogContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(5, 8),
  marginTop: theme.spacing(5),
}));

export const paperSx = {
  borderRadius: 2,
  border: GOLD_BORDER,
  background: 'linear-gradient(160deg, #1c1c1e 0%, #111113 100%)',
  boxShadow: '0 0 50px rgba(201, 168, 76, 0.08), 0 25px 60px rgba(0,0,0,0.9)',
  overflow: 'hidden',
} as const;

export const Title = styled(DialogTitle)({
  fontSize: '0.85rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  color: 'rgba(201, 168, 76, 0.9)',
  textAlign: 'center',
  padding: '18px 24px',
  borderBottom: GOLD_DIVIDER,
  background: 'rgba(201, 168, 76, 0.04)',
});

export const Actions = styled(DialogActions)({
  padding: '12px 20px',
  borderTop: GOLD_DIVIDER,
});

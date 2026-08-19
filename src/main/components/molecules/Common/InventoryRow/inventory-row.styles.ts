import { Chip, Typography, styled } from '@mui/material';

export const Row = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '9px 6px',
  borderRadius: 4,
  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
  transition: 'background 0.12s',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.04)',
  },
});

export const ItemIcon = styled('span')({
  fontSize: '1rem',
  lineHeight: 1,
  flexShrink: 0,
  width: 22,
  textAlign: 'center',
});

export const NameBlock = styled('div')({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
});

export const ItemName = styled(Typography)({
  fontSize: '0.88rem',
  fontWeight: 400,
  color: 'rgba(255, 255, 255, 0.82)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  lineHeight: 1.3,
});

export const WeaponBadge = styled(Chip)({
  height: 15,
  fontSize: '0.55rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  color: 'rgba(210, 80, 80, 0.85)',
  background: 'rgba(180, 50, 50, 0.1)',
  border: '1px solid rgba(180, 50, 50, 0.25)',
  borderRadius: 3,
  alignSelf: 'flex-start',
  '& .MuiChip-label': { padding: '0 5px' },
});

export const WeightBadge = styled('div')({
  fontSize: '0.7rem',
  color: 'rgba(255, 255, 255, 0.35)',
  borderRadius: 20,
  padding: '1px 9px',
  flexShrink: 0,
  whiteSpace: 'nowrap',
});

export const Actions = styled('div')({
  display: 'flex',
  flexShrink: 0,
  marginLeft: 2,
});

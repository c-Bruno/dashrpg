import { Chip, Typography, styled } from '@mui/material';

export const Row = styled('div')({
  position: 'relative',
  minWidth: 0,
  minHeight: 116,
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gridTemplateRows: 'minmax(0, 1fr) 24px',
  alignItems: 'center',
  gap: 0,
  padding: '5px 7px 4px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 7,
  background: 'rgba(255, 255, 255, 0.045)',
  transition: 'background 0.12s, border-color 0.12s',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.075)',
    borderColor: 'rgba(255, 255, 255, 0.42)',
  },
  '& > .MuiIconButton-root': {
    gridRow: '2',
    justifySelf: 'end',
    width: 24,
    height: 24,
    padding: 4,
    color: 'rgba(255, 255, 255, 0.58)',
    '&:hover': {
      color: '#f44336',
      background: 'rgba(244, 67, 54, 0.1)',
    },
  },
});

export const ItemButton = styled('button')({
  gridRow: '1',
  minWidth: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 3,
  padding: '3px 3px 2px',
  border: 0,
  borderRadius: 4,
  background: 'transparent',
  color: 'inherit',
  font: 'inherit',
  cursor: 'pointer',
  '&:focus-visible': {
    outline: '2px solid rgba(255, 255, 255, 0.82)',
    outlineOffset: 1,
  },
});

export const ItemIcon = styled('span')({
  fontSize: '1.5rem',
  lineHeight: 1,
  minHeight: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  textAlign: 'center',
});

export const NameBlock = styled('div')({
  minWidth: 0,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 3,
});

export const ItemName = styled(Typography)({
  width: '100%',
  fontSize: '0.82rem',
  fontWeight: 500,
  color: 'rgba(255, 255, 255, 0.92)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  lineHeight: 1.3,
  textAlign: 'center',
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
  alignSelf: 'center',
  '& .MuiChip-label': { padding: '0 5px' },
});

export const WeightBadge = styled('div')({
  fontSize: '0.68rem',
  color: 'rgba(255, 255, 255, 0.58)',
  textAlign: 'center',
  whiteSpace: 'nowrap',
});

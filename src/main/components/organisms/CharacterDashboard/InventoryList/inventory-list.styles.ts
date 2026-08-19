import { LinearProgress, Typography, styled } from '@mui/material';

export const CapacityRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  marginBottom: 14,
});

export const CapacityLabel = styled(Typography)({
  fontSize: '0.65rem',
  color: 'rgba(255, 255, 255, 0.35)',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  flexShrink: 0,
});

export const CapacityBar = styled(LinearProgress)({
  flex: 1,
  height: 3,
  borderRadius: 2,
  backgroundColor: 'rgba(255, 255, 255, 0.07)',
  '& .MuiLinearProgress-bar': {
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

export const SpaceInfo = styled(Typography)({
  fontSize: '0.65rem',
  color: 'rgba(255, 255, 255, 0.3)',
  whiteSpace: 'nowrap',
  flexShrink: 0,
});

export const ScrollableList = styled('div')({
  overflowY: 'auto',
  maxHeight: 320,
  paddingRight: 4,
  '&::-webkit-scrollbar': { width: 3 },
  '&::-webkit-scrollbar-track': { background: 'transparent' },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(201, 168, 76, 0.2)',
    borderRadius: 2,
  },
});

export const EmptyState = styled('div')({
  padding: '36px 0',
  textAlign: 'center',
  color: 'rgba(255, 255, 255, 0.18)',
  fontSize: '0.8rem',
  fontStyle: 'italic',
  letterSpacing: '0.06em',
});

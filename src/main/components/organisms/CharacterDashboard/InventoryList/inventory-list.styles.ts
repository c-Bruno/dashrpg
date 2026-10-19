import { LinearProgress, Typography, styled } from '@mui/material';

export const CapacityRow = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  marginBottom: 14,
});

export const CapacityInfo = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,
});

export const CapacityLabel = styled(Typography)({
  fontSize: '0.82rem',
  color: 'rgba(255, 255, 255, 0.82)',
  textTransform: 'uppercase',
  flexShrink: 0,
});

export const CapacityBar = styled(LinearProgress)({
  width: '100%',
  height: 8,
  borderRadius: 5,
  backgroundColor: 'rgba(255, 255, 255, 0.12)',
  '& .MuiLinearProgress-bar': {
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
  },
});

export const SpaceInfo = styled(Typography)({
  fontSize: '0.9rem',
  color: '#f4f0e8',
  whiteSpace: 'nowrap',
  flexShrink: 0,
});

export const FilterBar = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: 8,
  marginBottom: 12,
  '@media (max-width: 480px)': {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
});

export const FilterButton = styled('button')<{ $active: boolean }>(({ $active }) => ({
  minHeight: 54,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 3,
  border: `1px solid ${$active ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.16)'}`,
  borderRadius: 7,
  background: $active ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
  color: 'rgba(255, 255, 255, 0.86)',
  font: 'inherit',
  fontSize: '0.78rem',
  cursor: 'pointer',
  transition: 'background 0.15s, border-color 0.15s, color 0.15s',
  '&:hover': {
    borderColor: 'rgba(255, 255, 255, 0.42)',
    background: 'rgba(255, 255, 255, 0.06)',
  },
}));

export const ScrollableList = styled('div')({
  overflowY: 'auto',
  maxHeight: 320,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
  gap: 8,
  padding: '2px 2px 4px 0',
  '&::-webkit-scrollbar': { width: 4 },
  '&::-webkit-scrollbar-track': { background: 'transparent' },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.24)',
    borderRadius: 2,
  },
});

export const EmptyState = styled('div')({
  gridColumn: '1 / -1',
  padding: '36px 0',
  textAlign: 'center',
  color: 'rgba(255, 255, 255, 0.48)',
  fontSize: '0.8rem',
  fontStyle: 'italic',
});

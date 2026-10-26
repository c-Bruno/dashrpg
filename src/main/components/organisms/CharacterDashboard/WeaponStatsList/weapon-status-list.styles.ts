import { Typography, styled } from '@mui/material';

export const ListWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export const ScrollableList = styled('div')({
  flex: 1,
  overflowY: 'auto',
  paddingRight: 2,
  '&::-webkit-scrollbar': { width: 4 },
  '&::-webkit-scrollbar-track': { background: 'transparent' },
  '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: 2 },
});

export const EmptyState = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 80,
  color: 'rgba(255,255,255,0.2)',
  fontSize: '0.8rem',
  letterSpacing: '0.05em',
  fontStyle: 'italic',
  userSelect: 'none',
});

export const AddRow = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: 8,
  borderTop: '1px solid rgba(255,255,255,0.05)',
  marginTop: 4,
});

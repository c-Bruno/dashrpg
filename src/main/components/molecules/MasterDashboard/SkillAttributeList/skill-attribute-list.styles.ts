import { Box, styled, Typography } from '@mui/material';

export const CardContainer = styled(Box)({
  width: '100%',
  maxWidth: '320px',
  display: 'flex',
  flexDirection: 'column',
  background: '#1c1c22',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: '12px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.55)',
  overflow: 'hidden',
  transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
  '&:hover': {
    boxShadow: '0 6px 28px rgba(0, 0, 0, 0.65)',
    borderColor: 'rgba(255,255,255,0.14)',
  },
});

export const Header = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  justifyContent: 'space-between',
  padding: '2rem',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
});

export const Title = styled(Typography)({
  fontSize: '15px',
  fontWeight: '700',
  color: 'rgba(255,255,255,0.95)',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
});

export const Counter = styled(Box)({
  fontSize: '14px',
  fontWeight: '600',
  color: 'rgba(255,255,255,0.45)',
  background: 'rgba(255,255,255,0.06)',
  padding: '4px 10px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
  minHeight: '20px',
});

export const List = styled('ul')({
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  maxHeight: '240px',
  overflowY: 'auto',
  overflowX: 'hidden',

  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255,255,255,0.02)',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255,255,255,0.15)',
    borderRadius: '3px',
    '&:hover': {
      background: 'rgba(255,255,255,0.25)',
    },
  },
});

export const ListItem = styled('li')({
  padding: '10px 18px',
  fontSize: '15px',
  lineHeight: '1.4',
  color: 'rgba(255,255,255,0.75)',
  borderBottom: '1px solid rgba(255,255,255,0.04)',
  transition: 'background-color 0.15s ease, color 0.15s ease',

  '&:last-of-type': {
    borderBottom: 'none',
  },

  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.04)',
    color: 'rgba(255,255,255,0.95)',
  },
});

export const EmptyState = styled(Box)({
  padding: '32px 18px',
  textAlign: 'center',
  color: 'rgba(255,255,255,0.35)',
  fontSize: '13px',
});

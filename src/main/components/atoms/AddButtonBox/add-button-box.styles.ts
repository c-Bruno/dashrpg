import { styled } from '@mui/material';
import { Add } from '@mui/icons-material';

export const Container = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  padding: '15px',
  cursor: 'pointer',
  borderRadius: '3px',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  background: theme.palette.primary[900],
}));

export const AddIcon = styled(Add)(({ theme }) => ({
  fontSize: '65px',
  color: theme.palette.primary.main,
}));
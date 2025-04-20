import { Grid, styled } from '@mui/material';

export const BarTitle = styled(Grid)(({ theme }) => ({
  marginBottom: '2px',
  color: theme.palette.secondary.main,
  fontSize: '15px',
  fontWeight: 'bold',
}));

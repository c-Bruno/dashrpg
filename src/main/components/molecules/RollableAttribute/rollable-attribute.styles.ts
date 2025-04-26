import { Grid, styled } from '@mui/material';

export const AttributeName = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const AttributeTextName = styled('span')(({ theme }) => ({
  cursor: 'pointer',
  textAlign: 'center',
  fontWeight: 'bold',
}));

import { Grid, styled } from '@mui/material';
import Image from 'next/image';

export const CenteredGrid = styled(Grid)(() => ({
  marginLeft: 'auto',
  marginRight: 'auto',
}));

export const Dice = styled(Image)(() => ({
  cursor: 'pointer',
}));

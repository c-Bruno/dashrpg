import Image from 'next/image';

import { Grid, styled } from '@mui/material';

export const Dice = styled(Image)(({ theme }) => ({
  cursor: 'pointer',
  transition: '-webkit-transform .8s ease-in-out',
  transform: 'transform .8s ease-in-out',

  '&:hover': {
    transition: 'rotate(360deg)',
    transform: 'rotate(360deg)',
  },
}));

export const AttributeName = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const AttributeTextName = styled('span')(({ theme }) => ({
  cursor: 'pointer',
  textAlign: 'center',
  fontWeight: 'bold',
}));
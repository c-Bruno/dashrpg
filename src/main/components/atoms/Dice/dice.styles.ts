import { styled } from '@mui/material';
import Image from 'next/image';

export const Dice = styled(Image)(() => ({
  cursor: 'pointer',
  transition: '-webkit-transform .8s ease-in-out',
  transform: 'transform .8s ease-in-out',

  '&:hover': {
    transition: 'rotate(360deg)',
    transform: 'rotate(360deg)',
  },
}));

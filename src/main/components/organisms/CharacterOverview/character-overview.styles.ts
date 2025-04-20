import { Grid, styled } from '@mui/material';
import Image from 'next/image';

export const CenteredGrid = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const CharacterImage = styled(Image)(() => ({
  width: '200px',
  height: '200px',
  borderRadius: '50%',
  overflow: 'hidden',
  cursor: 'pointer',
  position: 'relative',
}));

export const Dice = styled(Image)(() => ({
  cursor: 'pointer',
  transition: '-webkit-transform .8s ease-in-out',
  transform: 'transform .8s ease-in-out',

  '&:hover': {
    transition: 'rotate(360deg)',
    transform: 'rotate(360deg)',
  },
}));

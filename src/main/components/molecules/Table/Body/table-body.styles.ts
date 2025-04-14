import styled from '@emotion/styled';

export const Dice = styled('img')(() => ({
  cursor: 'pointer',
  transition: '-webkit-transform .8s ease-in-out',
  transform: 'transform .8s ease-in-out',
  marginRight: '8px',
  '&:hover': {
    transition: 'rotate(360deg)',
    transform: 'rotate(360deg)',
  },
}));

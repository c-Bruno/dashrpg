import { keyframes, styled } from '@mui/material';
import Image from 'next/image';

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Dice = styled(Image, {
  shouldForwardProp: (prop) => prop !== 'stopRotation',
})<{ stopRotation?: boolean }>(({ stopRotation, onClick }) => ({
  cursor: onClick ? 'pointer' : 'default',
  ...(stopRotation === undefined
    ? {
        transition: '-webkit-transform .8s ease-in-out',
        transform: 'transform .8s ease-in-out',
        '&:hover': {
          transition: 'rotate(360deg)',
          transform: 'rotate(360deg)',
        },
      }
    : {
        animation: stopRotation ? 'none' : `${spinAnimation} 1s linear infinite`,
      }),
}));

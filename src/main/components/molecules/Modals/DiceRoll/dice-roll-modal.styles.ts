import { Chip, keyframes, styled } from '@mui/material';
import Image from 'next/image';

export const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const CenteredChip = styled(Chip)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  fontSize: 'medium',
}));

export const RotatingDiceImage = styled(Image, {
  shouldForwardProp: (prop) => prop !== 'stopRotation',
})<{ stopRotation?: boolean }>(({ stopRotation }) => ({
  animation: stopRotation ? 'none' : `${spinAnimation} 1s linear infinite`,
}));

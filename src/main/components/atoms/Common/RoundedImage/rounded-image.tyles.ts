import { Box, styled } from '@mui/material';
import Image from 'next/image';

interface ImageButtonProps {
  hoverEffect?: boolean;
}

interface ImageWrapperProps {
  width: number;
  height: number;
}

export const ImageWrappe = styled(Box)<ImageWrapperProps>(({ width, height }) => ({
  width: width ?? 95,
  height: height ?? 95,
  flexShrink: 0,
  alignSelf: 'center',
}));

export const ImageButton = styled('div')<ImageButtonProps>(({ hoverEffect }) => ({
  borderRadius: '50%',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'transform 0.3s, border-color 0.3s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': {
    transform: hoverEffect ? 'scale(1.3)' : 'none',
    borderColor: '#1976d2',
  },
}));

export const ImageWrapper = styled(Image)({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

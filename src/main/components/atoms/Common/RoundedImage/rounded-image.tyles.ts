import { styled } from '@mui/material';
import Image from 'next/image';

interface ImageButtonProps {
  hoverEffect?: boolean;
}

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

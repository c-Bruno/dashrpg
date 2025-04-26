import { styled } from '@mui/material';
import Image from 'next/image';

export const ImageButton = styled('div')(() => ({
  borderRadius: '50%',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'transform 0.3s, border-color 0.3s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    transform: 'scale(1.5)',
    borderColor: '#1976d2',
  },
}));

export const ImageWrapper = styled(Image)({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

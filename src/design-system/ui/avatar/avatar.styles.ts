import { Box, styled } from '@mui/material';

export const AvatarContainer = styled('span')<{
  variant?: 'round' | 'square';
  size: number;
}>(({ variant, size }) => ({
  width: size,
  height: size,
  borderRadius: variant === 'round' ? '50%' : 5,
  overflow: 'hidden',
  flexShrink: 0,
  background: 'rgba(9, 12, 15, 0.45)',
  '& img': {
    display: 'block',
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
    objectFit: 'cover',
    objectPosition: 'center 25%',
    imageRendering: 'pixelated',
  },
}));

export const AvatarFrame = styled(Box)({
  display: 'flex',
  width: '100%',
  maxWidth: 250,
  aspectRatio: '1',
  padding: 4,
  border: '1px solid #b27a3d',
  outline: '1px solid rgba(178, 122, 61, 0.32)',
  outlineOffset: 2,
  background: 'linear-gradient(135deg, #37291f, #11151b 28%, #11151b 72%, #37291f)',
  boxShadow: '0 5px 18px rgba(0, 0, 0, 0.5)',

  '& > span': {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    border: '1px solid rgba(227, 190, 139, 0.2)',
  },

  '@container character-overview (max-width: 820px)': {
    maxWidth: 154,
  },

  '@container character-overview (max-width: 500px)': {
    width: 78,
    padding: 3,
  },
});

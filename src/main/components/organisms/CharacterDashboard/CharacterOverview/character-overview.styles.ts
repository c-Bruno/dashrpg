import { Grid, styled } from '@mui/material';

export const CenteredGrid = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 12,
}));

export const ImageWrapper = styled('div')({
  position: 'relative',
  width: 130,
  height: 130,
});

export const GlowEffect = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: 130,
  height: 130,
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.23), transparent)',
  filter: 'blur(4px)',
  zIndex: 0,
});

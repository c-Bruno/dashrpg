import { Typography, styled } from '@mui/material';

const GOLD_FAINT = 'rgba(201, 168, 76, 0.06)';

export const Hint = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
}));

export const PreviewRow = styled('div')({
  display: 'flex',
  gap: 24,
  justifyContent: 'center',
  alignItems: 'flex-end',
  padding: '16px 0',
  borderRadius: 8,
  background: `radial-gradient(ellipse at center, rgba(201, 168, 76, 0.05) 0%, transparent 70%)`,
  border: '1px solid rgba(201, 168, 76, 0.12)',
});

export const PreviewCard = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 8,
});

export const PreviewLabel = styled(Typography)({
  fontSize: '0.6rem',
  color: 'rgba(201, 168, 76, 0.6)',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
});

// Fixed width; aspect-ratio keeps 420×600 proportions without any cropping
export const PreviewImage = styled('img')({
  width: 100,
  aspectRatio: '7 / 10',
  objectFit: 'contain',
  borderRadius: 6,
  border: `1px solid rgba(201, 168, 76, 0.25)`,
  background: '#111113',
  display: 'block',
});

export const PreviewPlaceholder = styled('div')({
  width: 100,
  aspectRatio: '7 / 10',
  borderRadius: 6,
  border: '1px dashed rgba(201, 168, 76, 0.2)',
  background: GOLD_FAINT,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.6rem',
  color: 'rgba(201, 168, 76, 0.25)',
  userSelect: 'none',
});

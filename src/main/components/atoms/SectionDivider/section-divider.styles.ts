import { styled, Typography } from '@mui/material';

const GOLD = 'rgba(201, 168, 76, 0.75)';

export const SectionDivider = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  '&::before': {
    content: '""',
    flex: 1,
    height: 1,
    background: `linear-gradient(to right, transparent, ${GOLD})`,
  },
  '&::after': {
    content: '""',
    flex: 1,
    height: 1,
    background: `linear-gradient(to left, transparent, ${GOLD})`,
  },
});

export const SectionLabel = styled(Typography)({
  fontSize: '0.6rem',
  color: 'rgba(201, 168, 76, 0.7)',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  whiteSpace: 'nowrap',
});

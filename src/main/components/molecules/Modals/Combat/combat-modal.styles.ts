import { Chip, Typography, styled } from '@mui/material';

const GOLD = 'rgba(201, 168, 76, 0.75)';
const GOLD_FAINT = 'rgba(201, 168, 76, 0.06)';

export const WeaponPreview = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 8,
  padding: '20px 16px 16px',
  background: `radial-gradient(ellipse at center, rgba(201, 168, 76, 0.07) 0%, transparent 70%)`,
  borderBottom: '1px solid rgba(201, 168, 76, 0.15)',
  marginBottom: 8,
});

export const WeaponIcon = styled('div')({
  fontSize: '2.6rem',
  lineHeight: 1,
  filter: 'drop-shadow(0 0 8px rgba(201, 168, 76, 0.4))',
  transition: 'filter 0.3s',
});

export const WeaponName = styled(Typography)({
  fontSize: '1rem',
  fontWeight: 600,
  color: GOLD,
  letterSpacing: '0.05em',
  textAlign: 'center',
  minHeight: '1.5em',
  transition: 'color 0.2s',
});

export const WeaponTypeBadge = styled(Chip)({
  fontSize: '0.65rem',
  height: 20,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  backgroundColor: GOLD_FAINT,
  border: `1px solid ${GOLD}`,
  color: GOLD,
  visibility: 'visible',
  '&.hidden': { visibility: 'hidden' },
});

export const SectionDivider = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  margin: '4px 0',
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
  fontSize: '0.62rem',
  color: 'rgba(201, 168, 76, 0.8)',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  whiteSpace: 'nowrap',
});

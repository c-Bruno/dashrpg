import { Typography, styled } from '@mui/material';
import Image from 'next/image';

const GOLD = 'rgba(201, 168, 76, 0.75)';

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const PortraitSection = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  padding: '16px 0 8px',
  background: `radial-gradient(ellipse at center, rgba(201, 168, 76, 0.08) 0%, transparent 70%)`,
});

export const PortraitPreview = styled(Image)({
  borderRadius: '50%',
  objectFit: 'cover',
  border: `2px solid ${GOLD}`,
  boxShadow: `0 0 18px rgba(201, 168, 76, 0.2), 0 0 40px rgba(201, 168, 76, 0.06)`,
  transition: 'border-color 0.3s, box-shadow 0.3s',
});

// Divisor ornamental com linhas graduais — padrão visual de jogos RPG
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
  fontSize: '0.65rem',
  color: 'rgba(201, 168, 76, 0.85)',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  whiteSpace: 'nowrap',
});

import { Box, IconButton, styled, Typography } from '@mui/material';

interface CardContainerProps {
  isCritical?: boolean;
  isDead?: boolean;
}

export const CharacterCardContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isCritical' && prop !== 'isDead',
})<CardContainerProps>(({ isCritical, isDead }) => ({
  height: '140px',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  padding: '6.5rem 2rem',
  borderRadius: '14px',
  cursor: isDead ? 'default' : 'pointer',
  background: '#1c1c22',

  border: (() => {
    if (isDead) return '1px solid rgba(255,255,255,0.06)';
    if (isCritical) return '1px solid rgba(232, 0, 110, 0.55)';
    return '1px solid rgba(255,255,255,0.09)';
  })(),

  boxShadow: isDead ? 'none' : '0 4px 24px rgba(0,0,0,0.55)',
  opacity: isDead ? 0.5 : 1,
  filter: isDead ? 'grayscale(0.85)' : 'none',

  transition: 'box-shadow 0.25s ease, border-color 0.25s ease, transform 0.15s ease',
  '&:hover': {
    transform: isDead ? 'none' : 'translateY(-2px)',
    boxShadow: isCritical ? '0 6px 28px rgba(232, 0, 110, 0.28)' : '0 8px 32px rgba(0, 0, 0, 0.7)',
    borderColor: isCritical ? 'rgba(232, 0, 110, 0.75)' : 'rgba(255,255,255,0.18)',
  },
}));

export const CardContent = styled(Box)({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '12px',
});

export const CardTopRow = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '8px',
});

export const TitleGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
  flex: 1,
  minWidth: 0,
});

export const CharacterTitle = styled(Typography)({
  fontSize: '20px',
  fontWeight: '700',
  lineHeight: 1.2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const CharacterSubtitle = styled(Typography)({
  fontSize: '15px',
  color: 'rgba(255,255,255,0.38)',
  lineHeight: 1.3,
});

export const MenuButton = styled(IconButton)({
  width: 28,
  height: 28,
  flexShrink: 0,
  color: 'rgba(255,255,255,0.4)',
  '&:hover': {
    color: 'rgba(255,255,255,0.9)',
    background: 'rgba(255,255,255,0.08)',
  },
});

export const StatsWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
});

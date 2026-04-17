import { Box, Button, styled, Typography } from '@mui/material';

interface CardContainerProps {
  isCritical?: boolean;
  isDead?: boolean;
}

export const CharacterCardContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isCritical' && prop !== 'isDead',
})<CardContainerProps>(({ isCritical, isDead }) => ({
  gap: '18px',
  width: '100%',
  display: 'flex',
  padding: '18px 20px',
  minHeight: '140px',
  borderRadius: '10px',
  alignItems: 'center',
  background: '#242424',

  border: (() => {
    if (isDead) return '1px solid rgba(255,255,255,0.06)';
    if (isCritical) return '1px solid rgba(232, 10, 103, 0.6)';
    return '1px solid rgba(255,255,255,0.10)';
  })(),

  boxShadow: isDead ? 'none' : '0 4px 20px rgba(0,0,0,0.6)',
  opacity: isDead ? 0.5 : 1,
  filter: isDead ? 'grayscale(0.85)' : 'none',

  transition: 'box-shadow 0.25s ease, border-color 0.25s ease, transform 0.15s ease',
  '&:hover': {
    transform: isDead ? 'none' : 'translateY(-2px)',
    boxShadow: isCritical ? '0 6px 24px rgba(232, 10, 103, 0.3)' : '0 8px 28px rgba(0, 0, 0, 0.7)',
    borderColor: isCritical ? 'rgba(232, 10, 103, 0.8)' : 'rgba(255,255,255,0.20)',
  },
}));

export const CharacterTitle = styled(Typography)({
  fontSize: '18px',
  fontWeight: '700',
  lineHeight: 1.2,
  letterSpacing: '0.2px',
});

export const CharacterDetails = styled(Box)({
  flex: 1,
  minWidth: 0,
  gap: '10px',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexDirection: 'column',
});

export const StatsWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const ActionButtonsWrapper = styled(Box)({
  gap: '10px',
  display: 'flex',
  alignItems: 'center',
  alignSelf: 'flex-end',
});

export const ActionButton = styled(Button)({
  width: 40,
  height: 40,
  minWidth: 40,
  borderRadius: '8px',
  padding: 0,
});

export const DangerActionButton = styled(Button)({
  width: 40,
  height: 40,
  minWidth: 40,
  borderRadius: '8px',
  padding: 0,
  color: '#E80A67',
  borderColor: 'rgba(232, 10, 103, 0.4)',
  '&:hover': {
    borderColor: '#E80A67',
    background: 'rgba(232, 10, 103, 0.1)',
  },
});

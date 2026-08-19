import { Chip, LinearProgress, Typography, styled } from '@mui/material';

// Per-type color tokens used in WeaponRow
export const TYPE_CONFIG: Record<string, { color: string; bg: string; border: string; icon: string }> = {
  Balistico: {
    color: 'rgba(220, 80, 80, 0.9)',
    bg: 'rgba(220, 80, 80, 0.1)',
    border: 'rgba(220, 80, 80, 0.28)',
    icon: '🔫',
  },
  Fisico: {
    color: 'rgba(80, 150, 220, 0.9)',
    bg: 'rgba(80, 150, 220, 0.1)',
    border: 'rgba(80, 150, 220, 0.28)',
    icon: '⚔️',
  },
  Fogo: {
    color: 'rgba(220, 130, 50, 0.9)',
    bg: 'rgba(220, 130, 50, 0.1)',
    border: 'rgba(220, 130, 50, 0.28)',
    icon: '🔥',
  },
};

export const DEFAULT_TYPE = {
  color: 'rgba(255,255,255,0.4)',
  bg: 'rgba(255,255,255,0.05)',
  border: 'rgba(255,255,255,0.12)',
  icon: '🗡️',
};

export const Row = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  padding: '13px 10px',
  borderRadius: 4,
  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
  transition: 'background 0.12s',
  '&:hover': { background: 'rgba(255, 255, 255, 0.03)' },
});

export const TypeIcon = styled('span')({
  fontSize: '1.4rem',
  lineHeight: 1,
  flexShrink: 0,
  width: 32,
  textAlign: 'center',
});

export const Identity = styled('div')({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  flexWrap: 'nowrap',
  overflow: 'hidden',
});

export const WeaponName = styled(Typography)({
  fontSize: '1rem',
  fontWeight: 500,
  color: 'rgba(255, 255, 255, 0.85)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

interface TypeBadgeProps {
  typeColor: string;
  typeBg: string;
  typeBorder: string;
}
export const TypeBadge = styled(Chip, {
  shouldForwardProp: (p) => !['typeColor', 'typeBg', 'typeBorder'].includes(p as string),
})<TypeBadgeProps>(({ typeColor, typeBg, typeBorder }) => ({
  height: 20,
  fontSize: '0.65rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  color: typeColor,
  background: typeBg,
  border: `1px solid ${typeBorder}`,
  borderRadius: 3,
  flexShrink: 0,
  '& .MuiChip-label': { padding: '0 8px' },
}));

export const DamagePill = styled('button')({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 20,
  padding: '4px 13px',
  cursor: 'pointer',
  color: 'rgba(255,255,255,0.75)',
  fontSize: '0.88rem',
  fontFamily: 'inherit',
  flexShrink: 0,
  transition: 'background 0.12s, border-color 0.12s',
  '&:hover': {
    background: 'rgba(255,255,255,0.09)',
    borderColor: 'rgba(255,255,255,0.2)',
  },
});

export const DiceEmoji = styled('span')({
  fontSize: '1.05rem',
  lineHeight: 1,
});

export const AmmoSection = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  flexShrink: 0,
  minWidth: 130,
});

interface AmmoBarProps {
  fillColor: string;
}
export const AmmoBar = styled(LinearProgress, {
  shouldForwardProp: (p) => p !== 'fillColor',
})<AmmoBarProps>(({ fillColor }) => ({
  width: 68,
  height: 5,
  borderRadius: 3,
  backgroundColor: 'rgba(255,255,255,0.08)',
  '& .MuiLinearProgress-bar': {
    borderRadius: 2,
    backgroundColor: fillColor,
    transition: 'transform 0.3s ease',
  },
}));

export const AmmoText = styled(Typography)({
  fontSize: '0.78rem',
  color: 'rgba(255,255,255,0.45)',
  whiteSpace: 'nowrap',
  minWidth: 40,
});

export const Actions = styled('div')({
  display: 'flex',
  flexShrink: 0,
  gap: 2,
});

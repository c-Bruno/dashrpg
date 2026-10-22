import { styled } from '@mui/material';
import type { CSSObject } from '@mui/material/styles';

const GOLD_BORDER = 'rgba(180, 126, 62, 0.72)';

export const contentSx: CSSObject = {
  padding: '24px 28px 28px',
  margin: 0,
  overflowY: 'auto',
};

export const paperSx: CSSObject = {
  position: 'relative',
  width: 590,
  maxWidth: 'calc(100% - 32px)',
  minHeight: 590,
  borderRadius: 1,
  border: `1px solid ${GOLD_BORDER}`,
  background:
    'repeating-linear-gradient(0deg, transparent 0 3px, rgba(255,255,255,0.008) 3px 4px), linear-gradient(115deg, #151c24, #0e151d)',
  boxShadow: '0 0 24px rgba(201, 145, 70, 0.08), 0 20px 55px rgba(0, 0, 0, 0.72)',
  overflow: 'hidden',
  '@media (max-height: 650px)': {
    minHeight: 0,
    maxHeight: 'calc(100% - 32px)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 4,
    pointerEvents: 'none',
    background: [
      'linear-gradient(#ad793f, #ad793f) left top / 6px 2px',
      'linear-gradient(#ad793f, #ad793f) left top / 2px 6px',
      'linear-gradient(#ad793f, #ad793f) right top / 6px 2px',
      'linear-gradient(#ad793f, #ad793f) right top / 2px 6px',
      'linear-gradient(#ad793f, #ad793f) left bottom / 6px 2px',
      'linear-gradient(#ad793f, #ad793f) left bottom / 2px 6px',
      'linear-gradient(#ad793f, #ad793f) right bottom / 6px 2px',
      'linear-gradient(#ad793f, #ad793f) right bottom / 2px 6px',
    ].join(','),
    backgroundRepeat: 'no-repeat',
  },
};

export const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

export const FieldGroup = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginBottom: 18,
});

export const FieldLabel = styled('label')({
  color: '#e2d2b5',
  fontSize: '0.9rem',
  fontWeight: 600,
});

export const FieldHint = styled('p')({
  margin: 0,
  color: '#8993a0',
  fontSize: '0.8rem',
});

export const nameFieldSx: CSSObject = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 1,
    backgroundColor: 'rgba(10, 15, 21, 0.5)',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(180, 126, 62, 0.72)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#d49a49',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e8b860',
    },
  },
  '& .MuiInputBase-input': {
    padding: '11px 14px',
  },
};

export const PortraitSection = styled('section')({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

export const PointsGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 14,
  marginBottom: 24,
  '@media (max-width: 560px)': {
    gridTemplateColumns: '1fr',
  },
});

export const PortraitDivider = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  color: 'rgba(201, 168, 76, 0.9)',
  fontSize: '0.7rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.16em',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  '&::before, &::after': {
    content: '""',
    height: 1,
    flex: 1,
    background: 'linear-gradient(90deg, transparent, rgba(180, 126, 62, 0.8))',
  },
  '&::after': {
    background: 'linear-gradient(90deg, rgba(180, 126, 62, 0.8), transparent)',
  },
});

export const actionsSx: CSSObject = {
  padding: '18px 24px',
};

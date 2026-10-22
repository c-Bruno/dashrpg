import type { CSSObject } from '@mui/material/styles';

export const headingFont = '"Pixelify Sans", monospace';
export const bodyFont = '"Rajdhani", sans-serif';

export const framedPanel: CSSObject = {
  position: 'relative',
  border: '1px solid #51402e',
  borderRadius: 2,
  background:
    'repeating-linear-gradient(0deg, transparent 0 3px, rgba(255,255,255,0.008) 3px 4px), linear-gradient(115deg, #151c24, #0e151d)',
  boxShadow: 'inset 0 0 28px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.2)',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 3,
    pointerEvents: 'none',
    background: [
      'linear-gradient(#ad793f, #ad793f) left top / 5px 2px',
      'linear-gradient(#ad793f, #ad793f) left top / 2px 5px',
      'linear-gradient(#ad793f, #ad793f) right top / 5px 2px',
      'linear-gradient(#ad793f, #ad793f) right top / 2px 5px',
      'linear-gradient(#ad793f, #ad793f) left bottom / 5px 2px',
      'linear-gradient(#ad793f, #ad793f) left bottom / 2px 5px',
      'linear-gradient(#ad793f, #ad793f) right bottom / 5px 2px',
      'linear-gradient(#ad793f, #ad793f) right bottom / 2px 5px',
    ].join(','),
    backgroundRepeat: 'no-repeat',
  },
};

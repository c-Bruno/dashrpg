import { Box, styled } from '@mui/material';
import { headingFont } from 'themes/dashboard-visuals.styles';

export const Row = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  minHeight: 40,
  padding: '5px 7px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.045)',
  transition: 'background-color 120ms ease',

  '&:hover': {
    background: 'rgba(212, 148, 84, 0.08)',
  },
  '&:last-child': { borderBottomColor: 'transparent' },
  '&[data-variant="framed"], &[data-variant="combat"]': {
    border: '1px solid #2b343e',
    borderRadius: 3,
    background: 'rgba(8,14,20,0.22)',
    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.025)',
    marginBottom: 8,
    minHeight: 58,
    padding: '8px 12px',
    gap: 22,
  },
  '&[data-variant="combat"]': {
    minHeight: 80,
    padding: '10px 24px',
    '& > span:first-of-type': { width: 48 },
    '& > div > span:first-of-type': { fontSize: '1.25rem' },
    '& > span:last-child': { display: 'flex', alignItems: 'center', gap: 16, fontSize: '1.2rem' },
  },
  '&:last-child[data-variant]': { marginBottom: 0 },
  '@media (max-width: 480px)': {
    '&[data-variant="combat"]': { padding: '10px 12px', gap: 12 },
  },
});

export const Icon = styled('span')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: 28,
  color: '#d5ba8f',
});

export const Name = styled('span')({
  display: 'block',
  overflow: 'hidden',
  color: '#d3d0ca',
  fontSize: '1rem',
  textTransform: 'capitalize',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const Detail = styled('span')({
  display: 'block',
  marginTop: 2,
  color: '#798294',
  fontSize: '0.9rem',
});

export const Value = styled('span')({
  flexShrink: 0,
  color: '#c0c8d4',
  fontSize: '1rem',
  fontWeight: 400,
  fontVariantNumeric: 'tabular-nums',

  '&[data-tone="accent"]': {
    color: '#e7a34f',
    fontFamily: headingFont,
    fontSize: '1.25rem',
  },

  '&[data-tone="danger"]': {
    color: '#ef5b5b',
  },
});

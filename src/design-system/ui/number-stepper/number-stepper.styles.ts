import { styled } from '@mui/material';

export const Container = styled('section')({
  display: 'flex',
  minWidth: 0,
  flexDirection: 'column',
  gap: 8,
  padding: 12,
  border: '1px solid rgba(180, 126, 62, 0.42)',
  borderRadius: 4,
  background: 'rgba(10, 15, 21, 0.32)',
});

export const Heading = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

export const Icon = styled('span')({
  display: 'inline-flex',
  color: '#d49a49',
});

export const Label = styled('span')({
  overflow: 'hidden',
  color: '#e2d2b5',
  fontSize: '0.75rem',
  fontWeight: 700,
  textOverflow: 'ellipsis',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  whiteSpace: 'nowrap',
});

export const Controls = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  border: '1px solid rgba(180, 126, 62, 0.45)',
  borderRadius: 4,
  '& .MuiIconButton-root': {
    color: '#d49a49',
    borderRadius: 2,
  },
  '& .MuiIconButton-root:disabled': {
    color: '#59616d',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: 0,
    backgroundColor: 'rgba(10, 15, 21, 0.48)',
    '& fieldset': { border: 0 },
  },
  '& input': {
    width: 60,
    padding: '6px 4px',
    color: '#e5e8eb',
    textAlign: 'center',
    fontSize: '1rem',
  },
  '& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button': {
    appearance: 'none',
    margin: 0,
  },
  '& input[type=number]': {
    MozAppearance: 'textfield',
  },
});

export const Description = styled('p')({
  margin: 0,
  color: '#8993a0',
  fontSize: '0.68rem',
  lineHeight: 1.4,
});

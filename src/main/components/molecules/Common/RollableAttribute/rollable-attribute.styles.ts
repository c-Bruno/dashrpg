import { styled } from '@mui/material';

export const Container = styled('div')(() => ({
  margin: '5px 0 15px',

  '& > div': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
}));

export const AttributeTextName = styled('span')(() => ({
  cursor: 'pointer',
  textAlign: 'center',
  fontWeight: 'bold',
}));

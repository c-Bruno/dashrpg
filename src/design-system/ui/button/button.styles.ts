import { IconButton, styled } from '@mui/material';

export const Button = styled(IconButton)(({ theme }) => ({
  width: 30,
  height: 30,
  padding: 4,
  borderRadius: 8,
  border: '1px solid #48505a',
  background: 'linear-gradient(135deg, #22292f, #13181d)',
  color: `${theme.palette.common.white}`,
  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 2px 5px rgba(0, 0, 0, 0.3)',
  '&:hover': {
    borderColor: `${theme.palette.primary.light}`,
    background: '#282820',
    color: `${theme.palette.primary.light}`,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.light}`,
    outlineOffset: 3,
  },
}));

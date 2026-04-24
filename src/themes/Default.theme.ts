import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0b0c',
    },
    primary: {
      main: '#fff',
      600: '#0a0b0c',
      900: '#181717',
    },
    secondary: {
      main: '#8c8c8c',
    },
  },
});

export default theme;

import { createTheme } from '@mui/material/styles';

/**
 *
 * Paleta observada:
 *   - Background principal: #141820 (cinza azulado escuro)
 *   - Sidebar: #1a1e28 (azul acinzentado)
 *   - Cards: #232833 / #2a2f3a (azul acinzentado médio)
 *   - Acento primário: #d49430 (dourado/laranja queimado)
 *   - Texto primário: #f0f0f0 (gelo)
 *   - Texto secundário: #8b95a5 (cinza azulado claro)
 *   - Bordas: rgba(255,255,255,0.06)
 */
const darkFantasyTheme = createTheme({
  palette: {
    mode: 'dark',
    common: {
      black: '#0d0f14',
      white: '#f0f0f0',
    },
    background: {
      default: '#141820',
      paper: '#1a1e28',
    },
    primary: {
      main: '#d49430', // Dourado queimado / laranja acento
      light: '#e8b860',
      dark: '#a87820',
      contrastText: '#0d0f14',
    },
    secondary: {
      main: '#8b95a5', // Cinza azulado claro
      light: '#a8b0c0',
      dark: '#6a7484',
      contrastText: '#f0f0f0',
    },
    error: {
      main: '#d44', // Vermelho mais vivo
      light: '#f66',
      dark: '#a22',
    },
    warning: {
      main: '#d49430',
      dark: '#a87820',
    },
    success: {
      main: '#4a8a6c',
      dark: '#2e5a44',
    },
    info: {
      main: '#6b8fc4', // Azul acinzentado para info
    },
    grey: {
      50: '#f0f0f0',
      100: '#d0d4dc',
      200: '#b0b8c4',
      300: '#9098a8',
      400: '#70788c',
      500: '#585e70',
      600: '#404454',
      700: '#2a2f3a',
      800: '#232833',
      900: '#1a1e28',
    },
    divider: 'rgba(255, 255, 255, 0.06)',
    text: {
      primary: '#f0f0f0',
      secondary: '#8b95a5',
      disabled: '#4a5060',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontWeight: 700,
      letterSpacing: '0.02em',
      fontSize: '1.6rem',
    },
    h2: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.01em',
      fontSize: '1.3rem',
    },
    h3: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontWeight: 600,
      fontSize: '1.1rem',
    },
    h4: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontWeight: 600,
      fontSize: '1rem',
    },
    h5: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontWeight: 600,
      fontSize: '0.85rem',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
    },
    h6: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontWeight: 500,
      fontSize: '0.8rem',
    },
    subtitle1: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontWeight: 400,
      fontSize: '0.75rem',
      color: '#8b95a5',
    },
    body1: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontSize: '0.85rem',
      color: '#d0d4dc',
    },
    body2: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontSize: '0.75rem',
      color: '#8b95a5',
    },
    caption: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontSize: '0.65rem',
      letterSpacing: '0.03em',
      color: '#585e70',
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#141820',
          minHeight: '100vh',
          scrollbarColor: '#2a2f3a #141820',
          '&::-webkit-scrollbar': {
            width: 6,
          },
          '&::-webkit-scrollbar-track': {
            background: '#141820',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#2a2f3a',
            borderRadius: 3,
            '&:hover': {
              background: '#404454',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1a1e28',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Inter", "Roboto", sans-serif',
          fontWeight: 500,
          fontSize: '0.8rem',
          borderRadius: 6,
          padding: '8px 18px',
          textTransform: 'none',
        },
        contained: {
          color: '#0d0f14',
          backgroundColor: '#d49430',
          '&:hover': {
            backgroundColor: '#e8b860',
          },
        },
        outlined: {
          borderColor: 'rgba(212, 148, 48, 0.3)',
          color: '#d49430',
          '&:hover': {
            borderColor: 'rgba(212, 148, 48, 0.6)',
            backgroundColor: 'rgba(212, 148, 48, 0.08)',
          },
        },
        text: {
          color: '#8b95a5',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.06)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: '"Inter", "Roboto", sans-serif',
          borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
          padding: '8px 12px',
        },
        head: {
          fontWeight: 600,
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: '#585e70',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#232833',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          color: '#d0d4dc',
          fontFamily: '"Inter", "Roboto", sans-serif',
          fontSize: '0.75rem',
          borderRadius: 4,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.08)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.15)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#d49430',
          },
          color: '#d0d4dc',
          fontFamily: '"Inter", "Roboto", sans-serif',
          fontSize: '0.85rem',
        },
        input: {
          fontFamily: '"Inter", "Roboto", sans-serif',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: '"Inter", "Roboto", sans-serif',
          color: '#585e70',
          fontSize: '0.85rem',
          '&.Mui-focused': {
            color: '#d49430',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        thumb: {
          backgroundColor: '#8b95a5',
        },
        track: {
          backgroundColor: '#2a2f3a',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          backgroundColor: '#232833',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1a1e28',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 6,
        },
      },
    },
  },
});

export default darkFantasyTheme;
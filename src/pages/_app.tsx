import { useEffect } from 'react';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ModalProvider } from 'main/contexts/ModalContext';
import type { AppProps } from 'next/app';

import theme from '../themes/Default.theme';
import '../themes/global.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Remove the server-side injected JSS styles to avoid conflicts with MUI
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </ModalProvider>
    </ThemeProvider>
  );
};

export default MyApp;

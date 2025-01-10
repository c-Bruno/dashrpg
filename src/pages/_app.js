import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";

import { ModalProvider } from "../contexts/ModalContext";
import theme from "../themes/Default.theme";
import "../themes/global.scss";

import i18n from '../i18n/i18n';
import { Provider } from "react-redux";
import configureStore from '../redux/configureStore';
import { I18nextProvider } from "react-i18next";

const store = configureStore({});

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <ModalProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </ModalProvider>
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  );
}

export default MyApp;

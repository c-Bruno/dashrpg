import i18n from "i18next";
import moment from 'moment';
import { initReactI18next } from 'react-i18next';

// Translations for english language
import masterDashboardEn from './translations/en/en.masterDashboard.i18n.json';

// Translations for portuguese language
import masterDashboardPtBr from './translations/pt-br/pt-br.masterDashboard.i18n.json';

// Import moment locales here. The default locale is english (en).
import 'moment/locale/pt-br';

const homeInstance = i18n.createInstance();

const resources = {
  en: {
    masterDashboard: masterDashboardEn
  },
  'pt-BR': {
    masterDashboard: masterDashboardPtBr
  }
};

let deviceLanguage = 'pt-BR';
if (typeof window !== 'undefined') {
  deviceLanguage = navigator.language || navigator.userLanguage;
}

// const language = deviceLanguage || 'pt-BR';
const language = 'pt-BR';
homeInstance.use(initReactI18next).init({
  ns: ['masterDashboard'],
  defaultNS: 'masterDashboard',
  fallbackLng: 'en',
  lng: language,
  resources,
  keySeparator: '.',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  react: {
    bindI18n: 'languageChanged',
    bindI18nStore: '',
    transEmptyNodeValue: '',
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
    useSuspense: true,
  },
});

const handleLoadMomentLocale = lang => {
  if (lang) moment.locale(lang.toLowerCase());
};

homeInstance.on('languageChanged', handleLoadMomentLocale);
handleLoadMomentLocale(language); // Load locale on app first render

export default homeInstance;
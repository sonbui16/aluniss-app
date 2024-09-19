import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import localesResourse from '../assets/locales';

i18n.use(initReactI18next).init({
  resources: localesResourse,
  fallbackLng: 'vi',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  react: {
    wait: true,
  },
});

export default i18n;

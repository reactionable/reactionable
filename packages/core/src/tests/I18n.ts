import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export async function i18nTestInstance() {
  await i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    lng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
  });
  return i18n;
}

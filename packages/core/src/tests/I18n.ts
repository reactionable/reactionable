import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export async function i18nTestInstance() {
  await i18n.use(initReactI18next).init({
    resources: {
      en: { translation: {} },
      fr: { translation: {} },
    },
    fallbackLng: 'en',
    lng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    supportedLngs: ['en', 'fr'],
    react: {
      useSuspense: false,
    },
  });
  return i18n;
}

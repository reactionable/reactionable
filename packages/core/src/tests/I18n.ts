import i18n, { i18n as I18nType } from "i18next";
import { initReactI18next } from "react-i18next";

export async function i18nTestInstance(): Promise<I18nType> {
  await i18n.use(initReactI18next).init({
    resources: {
      en: { translation: {} },
      fr: { translation: {} },
    },
    fallbackLng: "en",
    lng: "en",
    ns: ["translations"],
    defaultNS: "translations",
    supportedLngs: ["en", "fr"],
    react: {
      useSuspense: false,
    },
  });
  return i18n;
}

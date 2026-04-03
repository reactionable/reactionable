import { createInstance, i18n as I18nType } from "i18next";
import { initReactI18next } from "react-i18next";

export async function i18nTestInstance(): Promise<I18nType> {
  const i18n = createInstance();

  await i18n.use(initReactI18next).init({
    resources: {
      en: {
        common: {},
        identity: {},
      },
      fr: {
        common: {},
        identity: {},
      },
    },
    fallbackLng: "en",
    lng: "en",
    defaultNS: "common",
    ns: ["common", "identity"],
    supportedLngs: ["en", "fr"],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

  return i18n;
}

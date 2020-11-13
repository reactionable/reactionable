import i18n, { i18n as I18nType, InitOptions } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

export { useTranslation } from "react-i18next";

export async function initializeI18n(options: InitOptions): Promise<I18nType> {
  await i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      fallbackLng: options.resources ? Object.keys(options.resources)[0] : undefined,
      debug: false,
      interpolation: { escapeValue: false },
      nsSeparator: "::",
      keySeparator: "..",
      supportedLngs: [options.lng, options.fallbackLng, Object.keys(options.resources || {})]
        .filter((language) => !!language)
        .filter((value, index, self) => self.indexOf(value) === index) as string[],
      ...options,
    });
  return i18n;
}

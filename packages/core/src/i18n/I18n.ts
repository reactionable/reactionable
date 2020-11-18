import deepmerge from "deepmerge";
import i18n, { i18n as I18nType, InitOptions } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enIdentity from "./locales/en/identity.json";
import frCommon from "./locales/fr/common.json";
import frIdentity from "./locales/fr/identity.json";

export { useTranslation } from "react-i18next";

const builtInResources = {
  en: {
    common: enCommon,
    identity: enIdentity,
  },
  fr: {
    common: frCommon,
    identity: frIdentity,
  },
};

export async function initializeI18n(options: InitOptions = {}): Promise<I18nType> {
  options.resources = deepmerge(builtInResources, options.resources ?? {});

  const resourcesLanguages = Object.keys(options.resources);
  const supportedLngs = [options.lng, options.fallbackLng, ...resourcesLanguages]
    .filter((language) => !!language)
    .filter((value, index, self) => self.indexOf(value) === index) as string[];

  await i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      fallbackLng: Object.keys(resourcesLanguages)[0] ?? undefined,
      debug: false,
      interpolation: {
        escapeValue: false, // not needed for react
      },
      nsSeparator: "::",
      keySeparator: "..",
      supportedLngs,
      defaultNS: "common",
      ...options,
    });
  return i18n;
}

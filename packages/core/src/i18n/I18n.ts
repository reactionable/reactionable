import i18n, {
  i18n as I18nType,
  InitOptions,
  Namespace,
  Resource,
  ResourceKey,
  ResourceLanguage,
  TFunction,
} from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enIdentity from "./locales/en/identity.json";
import frCommon from "./locales/fr/common.json";
import frIdentity from "./locales/fr/identity.json";
import { useTranslation as i18nextUseTranslation } from "react-i18next";

const builtInResources: Resource = {
  en: {
    common: enCommon,
    identity: enIdentity,
  },
  fr: {
    common: frCommon,
    identity: frIdentity,
  },
};

const defaultOptions = {
  debug: false,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  defaultNS: "common",
};

export function useTranslation<Ns extends Namespace, KPrefix>(
  namespace: Ns | undefined = undefined
): { t: TFunction<Ns, KPrefix>; i18n: I18nType } {
  const { t, i18n } = i18nextUseTranslation(namespace);
  return { t, i18n };
}

// Merge a `source` object to a `target` recursively
function mergeResources<MergableResource extends Resource | ResourceLanguage | ResourceKey>(
  target: MergableResource,
  source: MergableResource
): MergableResource {
  if (!source || typeof source !== "object") {
    throw new Error("Source must be an object");
  }

  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  for (const key of Object.keys(source)) {
    if (typeof source[key] !== "object") {
      continue;
    }

    if (typeof target !== "object") {
      continue;
    }

    const mergedResources = mergeResources(target[key], source[key]);
    Object.assign(source[key], mergedResources);
  }

  // Join `target` and modified `source`
  Object.assign(target || {}, source);
  return target;
}

export async function initializeI18n(options: InitOptions = {}): Promise<I18nType> {
  options.resources = mergeResources(builtInResources, options.resources ?? {});

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
      ...defaultOptions,
      fallbackLng: Object.keys(resourcesLanguages)[0] ?? undefined,
      supportedLngs,
      ...options,
    });
  return i18n;
}

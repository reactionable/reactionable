import i18n, {
  i18n as I18nType,
  InitOptions,
  Resource,
} from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { defaultNamespace } from "./i18next";
import enCommon from "./locales/en/common.json";
import enIdentity from "./locales/en/identity.json";
import frCommon from "./locales/fr/common.json";
import frIdentity from "./locales/fr/identity.json";

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
  enableSelector: "optimize" as const,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  defaultNS: defaultNamespace,
  returnNull: false,
};

export { useTranslation } from "react-i18next";
export { keyFromSelector } from "i18next";

type ResourceTree = Record<string, unknown>;

function isResourceTree(value: unknown): value is ResourceTree {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function mergeResources(target: ResourceTree, source: ResourceTree): ResourceTree {
  const mergedResources: ResourceTree = { ...target };

  for (const [key, value] of Object.entries(source)) {
    const targetValue = mergedResources[key];
    if (isResourceTree(targetValue) && isResourceTree(value)) {
      mergedResources[key] = mergeResources(targetValue, value);
      continue;
    }

    mergedResources[key] = value;
  }

  return mergedResources;
}

export async function initializeI18n(options: InitOptions = {}): Promise<I18nType> {
  const { resources: userResources, ...initOptions } = options;
  const resources = mergeResources(
    builtInResources as ResourceTree,
    (userResources ?? {}) as ResourceTree
  ) as Resource;

  const resourcesLanguages = Object.keys(resources);
  const supportedLngs = [initOptions.lng, initOptions.fallbackLng, ...resourcesLanguages]
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
      fallbackLng: resourcesLanguages[0] ?? undefined,
      resources,
      supportedLngs,
      ...initOptions,
    });
  return i18n;
}

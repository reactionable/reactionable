import { I18n } from "@aws-amplify/core";
import { initializeI18n as coreInitializeI18n } from "@reactionable/core";
import { i18n as I18nType, InitOptions } from "i18next";

function extractLanguage(language: string): string {
  const languageParts = language.split("-");
  return languageParts[0];
}

export async function initializeI18n(options: InitOptions): Promise<I18nType> {
  const i18n = await coreInitializeI18n(options);
  I18n.setLanguage(extractLanguage(i18n.language));

  if (options.resources) {
    for (const language of Object.keys(options.resources)) {
      const translation = options.resources[language].translation;
      if ("object" === typeof translation) {
        I18n.putVocabulariesForLanguage(extractLanguage(language), translation);
      }
    }
  }

  i18n.on("languageChanged", (language) => I18n.setLanguage(extractLanguage(language)));

  return i18n;
}

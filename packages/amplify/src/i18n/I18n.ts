import { InitOptions } from 'i18next';
import { I18n } from '@aws-amplify/core';
import { initializeI18n as coreInitializeI18n } from '@reactionable/core';

function extractLanguage(language: string) {
  return language.split('-').shift();
}

export async function initializeI18n(options: InitOptions) {
  const i18n = await coreInitializeI18n(options);
  I18n.setLanguage(extractLanguage(i18n.language));

  if (options.resources) {
    for (const language of Object.keys(options.resources)) {
      if (options.resources[language].translation) {
        I18n.putVocabulariesForLanguage(
          extractLanguage(language),
          options.resources[language].translation
        );
      }
    }
  }

  i18n.on('languageChanged', (language) => I18n.setLanguage(extractLanguage(language)));

  return i18n;
}

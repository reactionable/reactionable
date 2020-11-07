import { i18nTestInstance } from '@reactionable/core/src/tests/I18n';
import { action } from '@storybook/addon-actions';
import React from 'react';

import { LanguageSelector } from '../../src/i18n/LanguageSelector';
import { UIContextProvider } from '../../src/UI';

export default {
  title: 'UI Material/Components/I18n',
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    component: LanguageSelector,
  },
};

export const SimpleLanguageSelector = () => {
  i18nTestInstance();
  return (
    <UIContextProvider>
      <LanguageSelector onSelectLanguage={action('Language has changed')} />
    </UIContextProvider>
  );
};

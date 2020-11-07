import { action } from '@storybook/addon-actions';
import React from 'react';

import { i18nTestInstance } from '../../../src/tests/I18n';
import { LanguageSelector } from '../../../src/ui/i18n/LanguageSelector';
import { UIContextProvider, useUIProviderProps } from '../../../src/ui/UI';

export default {
  title: 'Core/Components/UI/I18n',
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    component: LanguageSelector,
  },
};

i18nTestInstance();

export const SimpleLanguageSelector = () => {
  return (
    <UIContextProvider {...useUIProviderProps()}>
      <LanguageSelector onSelectLanguage={action('Language has changed')} />
    </UIContextProvider>
  );
};

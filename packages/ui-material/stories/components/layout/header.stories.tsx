import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { Header } from '../../../src/layout/header/Header';
import { UIContextProvider } from '../../../src/UI';

export default {
  title: 'UI Material/Components/Layout/Header',
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Header },
  decorators: [withKnobs],
};

export const SimpleHeader = () => {
  const variant = select(
    'Variant',
    ['default', 'inherit', 'primary', 'secondary', 'transparent', undefined],
    'default'
  );

  const dark = boolean('Dark Mode', false);

  return (
    <UIContextProvider theme={{ palette: { type: dark ? 'dark' : 'light' } }}>
      <Header
        brand="Test brand header"
        color={variant}
        navItems={[{ href: '/sample', children: 'Sample link' }]}
      />
    </UIContextProvider>
  );
};

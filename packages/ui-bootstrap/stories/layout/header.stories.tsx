import '../config';

import { select, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { Header } from '../../src/layout/header/Header';

export default {
  title: 'UI Bootstrap/Layout/Header',
  parameters: { info: { inline: true }, component: Header },
  decorators: [withKnobs],
};

export const SimpleHeader = () => {
  const variant = select('Variant', ['dark', 'light', undefined], undefined);
  return (
    <Header
      brand="Test brand header"
      variant={variant}
      navItems={[{ href: '/sample', children: 'Sample link' }]}
    />
  );
};

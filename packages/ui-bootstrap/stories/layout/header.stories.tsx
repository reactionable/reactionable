import '../config';

import { select, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

import { Header } from '../../src/layout/header/Header';

export default {
  title: 'UI Bootstrap/Layout/Header',
  parameters: { info: { inline: true }, component: Header },
  decorators: [withKnobs],
};

export const SimpleHeader = () => {
  const variant = select('Variant', ['dark', 'light', undefined], undefined);
  return (
    <Router>
      <Header
        brand="Test brand header"
        variant={variant}
        navItems={[{ to: '/sample', children: 'Sample link' }]}
      />
    </Router>
  );
};

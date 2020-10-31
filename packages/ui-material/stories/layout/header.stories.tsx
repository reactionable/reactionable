import { select, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

import { Header } from '../../src/layout/header/Header';

export default {
  title: 'UI Material/Layout/Header',
  parameters: { info: { inline: true }, component: Header },
  decorators: [withKnobs],
};

export const SimpleHeader = () => {
  const variant = select(
    'Variant',
    ['default', 'inherit', 'primary', 'secondary', 'transparent', undefined],
    'primary'
  );
  return (
    <Router>
      <Header
        brand="Test brand header"
        color={variant}
        navItems={[{ href: '/sample', children: 'Sample link' }]}
      />
    </Router>
  );
};

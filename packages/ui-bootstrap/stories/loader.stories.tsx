import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Loader } from '../src/loader/Loader';
import './config';

export default {
  title: 'UI Bootstrap/Loader',
  parameters: { info: { inline: true }, component: Loader },
  decorators: [withKnobs],
};

export const SimpleLoader = () => {
  const overlay = boolean('Overlay', false);

  return <Loader overlay={overlay} />;
};

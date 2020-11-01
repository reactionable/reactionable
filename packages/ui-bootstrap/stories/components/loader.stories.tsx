import '../config';

import { boolean, withKnobs } from '@storybook/addon-knobs';
import React, { useEffect } from 'react';

import { Loader, useLoader } from '../../src/loader/Loader';

export default {
  title: 'UI Bootstrap/Components/Loader',
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Loader },
  decorators: [withKnobs],
};

export const SimpleLoader = () => {
  const overlay = boolean('Overlay', false);

  return <Loader overlay={overlay} />;
};

export const UseLoader = () => {
  const overlay = boolean('Overlay', false);
  const loading = boolean('Loading', true);
  const { loader, setLoading } = useLoader({ overlay });

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  return loader;
};

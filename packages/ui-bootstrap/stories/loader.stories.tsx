import React, { useEffect } from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Loader, useLoader } from '../src/loader/Loader';
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

export const UseLoader = () => {
  const overlay = boolean('Overlay', false);
  const loading = boolean('Loading', true);
  const { loader, setLoading } = useLoader({ overlay });

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  return loader;
};

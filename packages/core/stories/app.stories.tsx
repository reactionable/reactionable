import React from 'react';
import { App } from '../src/app/App';
import { useUIContextProviderProps } from '../src/ui/UI';

export default {
  title: 'Core/App',
  parameters: { info: { inline: true }, component: App },
};

export const AppBasic = () => <App ui={useUIContextProviderProps()} routes={[]} />;

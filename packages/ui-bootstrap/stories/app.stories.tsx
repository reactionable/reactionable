import React from 'react';
import { App } from '@reactionable/core';
import { useUIContextProviderProps } from '../src/UI';

export default { title: 'UI Bootstrap/App', parameters: { info: { inline: true } } };

export const AppBasic = () => <App ui={useUIContextProviderProps()} routes={[]} />;

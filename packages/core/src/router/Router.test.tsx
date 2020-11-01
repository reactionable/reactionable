import { render } from '@testing-library/react';
import React from 'react';

import { RouterContextProvider, useRouterProviderProps } from './Router';

describe('Router', () => {
  it('should render without crashing', async () => {
    render(<RouterContextProvider {...useRouterProviderProps()}>test</RouterContextProvider>);
  });
});

import Button from '@material-ui/core/Button/Button';
import Paper from '@material-ui/core/Paper/Paper';
import { App } from '@reactionable/core';
import React, { lazy } from 'react';

import { useUIProviderProps } from '../../src/UI';

export default {
  title: 'UI Material/Components/App',
  parameters: { info: { inline: true }, options: { showPanel: true }, component: App },
};

const HomeComponent = lazy(async () => ({
  default: () => {
    return (
      <Paper elevation={3}>
        <h1>Hello, world!</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for calling extra attention
          to featured content or information.
        </p>
        <p>
          <Button color="primary">Learn more</Button>
        </p>
      </Paper>
    );
  },
}));

export const AppBasic = () => (
  <App
    ui={useUIProviderProps()}
    routes={[]}
    layout={{
      header: { brand: 'Sample Header Brand' },
      footer: { brand: 'Sample Footer Brand' },
    }}
    HomeComponent={HomeComponent}
  />
);

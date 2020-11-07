import Button from '@material-ui/core/Button/Button';
import Paper from '@material-ui/core/Paper/Paper';
import React from 'react';

import { UIContextProvider } from '../../src/UI';

export default {
  title: 'UI Material/Components/Context Provider',
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    component: UIContextProvider,
  },
};

export const SimpleUIContextProvider = () => (
  <UIContextProvider>
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
  </UIContextProvider>
);

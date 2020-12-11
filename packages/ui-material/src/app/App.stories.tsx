import Button from "@material-ui/core/Button/Button";
import Paper from "@material-ui/core/Paper/Paper";
import { App } from "@reactionable/core";
import React, { ReactElement } from "react";

import { useUIProviderProps } from "../UI";

export default {
  title: "UI Material/Components/App",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: App },
};

const Home = () => (
  <Paper elevation={3}>
    <h1>Hello, world!</h1>
    <p>
      This is a Basic hero unit, a Basic jumbotron-style component for calling extra attention to
      featured content or information.
    </p>
    <p>
      <Button color="primary">Learn more</Button>
    </p>
  </Paper>
);

export const AppWithProviders = (): ReactElement => (
  <App ui={useUIProviderProps()}>
    <Home />
  </App>
);

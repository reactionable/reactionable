import Button from "@material-ui/core/Button/Button";
import Paper from "@material-ui/core/Paper/Paper";
import { ReactElement } from "react";

import { UIContextProvider } from "./UI";

export default {
  title: "UI Material/Components/Context Provider",
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    component: UIContextProvider,
  },
};

export const BasicUIContextProvider = (): ReactElement => (
  <UIContextProvider>
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
  </UIContextProvider>
);

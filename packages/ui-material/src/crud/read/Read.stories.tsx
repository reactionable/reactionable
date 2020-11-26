import { List, ListItem, ListItemText } from "@material-ui/core";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import React, { ReactElement } from "react";

import { Read } from "./Read";
import { UIContextProvider } from "../../UI";

export default {
  title: "UI Material/Components/Crud/Read",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Read },
  decorators: [withKnobs],
};

export const BasicRead = (): ReactElement => {
  const loading = boolean("Is loading?", false);
  const hasError = boolean("Has error?", false);
  return (
    <UIContextProvider>
      <Read
        loading={loading}
        refetch={() => null}
        error={hasError ? new Error("An error has occured") : undefined}
        data={{ id: "1", label: "Data 1" }}
      >
        {({ data }) => (
          <List>
            <ListItem>
              <ListItemText primary="ID" secondary={data.id} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Label" secondary={data.label} />
            </ListItem>
          </List>
        )}
      </Read>
    </UIContextProvider>
  );
};

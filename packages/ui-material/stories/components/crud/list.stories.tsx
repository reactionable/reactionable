import { boolean, withKnobs } from "@storybook/addon-knobs";
import React, { ReactElement } from "react";

import { List } from "../../../src/crud/list/List";
import { UIContextProvider } from "../../../src/UI";

export default {
  title: "UI Material/Components/Crud/List",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: List },
  decorators: [withKnobs],
};

export const list = (): ReactElement => {
  const isLoading = boolean("Is loading?", false);
  const hasError = boolean("Has error?", false);
  return (
    <UIContextProvider>
      <List
        head={["ID", "Label"]}
        isLoading={isLoading}
        error={hasError && new Error("An error has occured")}
        data={[
          { id: "1", label: "Data 1" },
          { id: "2", label: "Data 2" },
        ]}
      >
        {(data) => (
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.label}</td>
          </tr>
        )}
      </List>
    </UIContextProvider>
  );
};

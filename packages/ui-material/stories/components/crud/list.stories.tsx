import { boolean, withKnobs } from "@storybook/addon-knobs";
import React, { ReactElement } from "react";

import { List } from "../../../src/crud/list/List";
import { UIContextProvider } from "../../../src/UI";

export default {
  title: "UI Material/Components/Crud/List",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: List },
  decorators: [withKnobs],
};

export const SimpleList = (): ReactElement => {
  const loading = boolean("Is loading?", false);
  const hasError = boolean("Has error?", false);
  return (
    <UIContextProvider>
      <List
        head={["ID", "Label"]}
        loading={loading}
        error={hasError && new Error("An error has occured")}
        data={{
          count: 2,
          items: [
            { id: "1", label: "Data 1" },
            { id: "2", label: "Data 2" },
          ],
        }}
        refetch={() => null}
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

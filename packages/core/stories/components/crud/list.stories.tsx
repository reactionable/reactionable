import { boolean, withKnobs } from "@storybook/addon-knobs";
import React, { ReactElement } from "react";

import { List } from "../../../src/crud/list/List";
import { UIContextProvider, useUIProviderProps } from "../../../src/ui/UI";

export default {
  title: "Core/Components/Crud/List",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: List },
  decorators: [withKnobs],
};

export const SimpleList = (): ReactElement => {
  const loading = boolean("Is loading?", false);
  const hasError = boolean("Has error?", false);

  return (
    <UIContextProvider {...useUIProviderProps()}>
      <List
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
        {({ data }) => (
          <table>
            <thead>
              <tr>
                <td>Id</td>
                <td>Label</td>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </List>
    </UIContextProvider>
  );
};

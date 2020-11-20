import { boolean, withKnobs } from "@storybook/addon-knobs";
import React, { ReactElement } from "react";

import { Read } from "../../../src/crud/read/Read";
import { UIContextProvider, useUIProviderProps } from "../../../src/ui/UI";

export default {
  title: "Core/Components/Crud/Read",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Read },
  decorators: [withKnobs],
};

export const SimpleRead = (): ReactElement => {
  const loading = boolean("Is loading?", false);
  const hasError = boolean("Has error?", false);
  return (
    <UIContextProvider {...useUIProviderProps()}>
      <Read
        loading={loading}
        refetch={() => null}
        error={hasError && new Error("An error has occured")}
        data={{ id: "1", label: "Data 1" }}
      >
        {({ data }) => (
          <ul>
            <li>ID: {data.id}</li>
            <li>Label: {data.label}</li>
          </ul>
        )}
      </Read>
    </UIContextProvider>
  );
};

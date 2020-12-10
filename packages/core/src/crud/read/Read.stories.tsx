import { boolean, withKnobs } from "@storybook/addon-knobs";
import { ReactElement } from "react";

import { UIContextProvider, useUIProviderProps } from "../../ui/UI";
import { Read } from "./Read";

export default {
  title: "Core/Components/Crud/Read",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Read },
  decorators: [withKnobs],
};

export const BasicRead = (): ReactElement => {
  const loading = boolean("Is loading?", false);
  const hasError = boolean("Has error?", false);
  return (
    <UIContextProvider {...useUIProviderProps()}>
      <Read
        loading={loading}
        refetch={() => null}
        error={hasError ? new Error("An error has occured") : undefined}
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

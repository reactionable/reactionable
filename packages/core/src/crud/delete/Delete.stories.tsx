import { action } from "@storybook/addon-actions";
import { ReactElement } from "react";

import { UIContextProvider, useUIProviderProps } from "../../ui/UI";
import { Delete } from "./Delete";

export default {
  title: "Core/Components/Crud/Delete",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Delete },
};

export const BasicDelete = (): ReactElement => (
  <UIContextProvider {...useUIProviderProps()}>
    <Delete
      title="Basic label"
      confirmationMessage="Do you want to delete?"
      successMessage="The deletion has been done"
      onConfirm={async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        action("Action confirmed")();
        return "ok";
      }}
      onSuccess={action("Action succeed")}
    >
      <button>Click on me</button>
    </Delete>
  </UIContextProvider>
);

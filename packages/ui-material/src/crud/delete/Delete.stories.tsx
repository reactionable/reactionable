import { action } from "@storybook/addon-actions";
import React, { ReactElement } from "react";

import { UIContextProvider } from "../../UI";
import { Delete } from "./Delete";

export default {
  title: "UI Material/Components/Crud/Delete",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Delete },
};

export const BasicDelete = (): ReactElement => (
  <UIContextProvider>
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
      Click on me
    </Delete>
  </UIContextProvider>
);

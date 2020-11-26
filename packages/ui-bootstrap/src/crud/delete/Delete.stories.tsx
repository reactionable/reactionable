import "../../../stories/config";

import { action } from "@storybook/addon-actions";
import React, { ReactElement } from "react";
import Button from "react-bootstrap/Button";

import { Delete } from "./Delete";
import { UIContextProvider } from "../../UI";

export default {
  title: "UI Bootstrap/Components/Crud/Delete",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Delete },
};

export const BasicDelete = (): ReactElement => (
  <UIContextProvider>
    <Delete
      title="Basic label"
      label="Basic delete button"
      confirmationMessage="Do you want to delete?"
      successMessage="The deletion has been done"
      onConfirm={async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        action("Action confirmed")();
        return "ok";
      }}
      onSuccess={action("Action succeed")}
    >
      <Button>Click on me</Button>
    </Delete>
  </UIContextProvider>
);

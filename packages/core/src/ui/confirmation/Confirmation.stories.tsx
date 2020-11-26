import { action } from "@storybook/addon-actions";
import React, { ReactElement } from "react";

import { ConfirmationAction } from "./Confirmation";
import { UIContextProvider, useUIProviderProps } from "../UI";

export default {
  title: "Core/Components/UI/Confirmation",
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    component: ConfirmationAction,
  },
};

export const BasicConfirmationAction = (): ReactElement => (
  <UIContextProvider {...useUIProviderProps()}>
    <ConfirmationAction
      title="Confirm?"
      confirmationMessage="Do you want to perform this action"
      successMessage="The action has been confirmed"
      onConfirm={async () => {
        action("Action confirmed")();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return "ok";
      }}
      onSuccess={action("Action succeed")}
    >
      <div>
        <button>Click on me</button>
        <hr />
      </div>
    </ConfirmationAction>
  </UIContextProvider>
);

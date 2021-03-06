import Button from "@material-ui/core/Button/Button";
import { action } from "@storybook/addon-actions";
import { text, withKnobs } from "@storybook/addon-knobs";
import { ReactElement } from "react";

import { UIContextProvider } from "../UI";
import { ConfirmationAction, useConfirmation } from "./Confirmation";

export default {
  title: "UI Material/Components/Confirmation",
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    component: ConfirmationAction,
  },
  component: ConfirmationAction,
  decorators: [withKnobs],
};

export const BasicConfirmationAction = (): ReactElement => (
  <UIContextProvider>
    <ConfirmationAction
      title="Confirm?"
      confirmationMessage="Do you want to perform this action"
      successMessage="The action has been confirmed"
      onConfirm={async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        action("Action confirmed")();
        return "ok";
      }}
      onSuccess={action("Action succeed")}
    >
      <Button>Click on me</Button>
    </ConfirmationAction>
  </UIContextProvider>
);

export const UseConfirmation = (): ReactElement => {
  const title = text("Title", "This is a confirmation");
  const content = text("Content", "This is a confirmation content");

  const { confirmation, setConfirmation } = useConfirmation({
    title,
    children: content,
    callback: async (confirm: boolean) => {
      action(confirm ? "Action confirmed" : "Action canceled")();
    },
  });

  return (
    <>
      <Button onClick={() => setConfirmation(true)}>Click on me</Button>
      {confirmation}
    </>
  );
};

import "../../stories/config";

import { action } from "storybook/actions";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "react-bootstrap/Button";

import { UIContextProvider } from "../UI";
import {
  Confirmation,
  ConfirmationAction,
  IUseConfirmationProps,
  useConfirmation,
} from "./Confirmation";

const meta: Meta<typeof Confirmation> = {
  title: "UI Bootstrap/Components/Confirmation",
  component: Confirmation,
};
export default meta;

export const UseConfirmation: StoryObj<IUseConfirmationProps> = {
  args: {
    title: "Confirm?",
    callback: async (confirm: boolean) => {
      action(confirm ? "Action confirmed" : "Action canceled")();
    },
  },
  render: (props) => {
    const { confirmation, setConfirmation } = useConfirmation(props);

    return (
      <>
        <Button onClick={() => setConfirmation(true)}>Click on me</Button>
        {confirmation}
      </>
    );
  },
};

export const BasicConfirmationAction: StoryObj<typeof ConfirmationAction> = {
  args: {
    title: "Confirm?",
    confirmationMessage: "Do you want to perform this action",
    successMessage: "The action has been confirmed",
    onConfirm: async () => {
      action("Action confirmed")();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return "ok";
    },
    onSuccess: action("Action succeed"),
    children: <Button>Click on me</Button>,
  },
  render: (props) => (
    <UIContextProvider>
      <ConfirmationAction {...props} />
    </UIContextProvider>
  ),
};

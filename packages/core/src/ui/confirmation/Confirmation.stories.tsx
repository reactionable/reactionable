import { action } from "storybook/actions";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { UIContextProvider, useUIProviderProps } from "../UI";
import { Confirmation, ConfirmationAction, useConfirmation } from "./Confirmation";

const meta: Meta<typeof Confirmation> = {
  title: "Core/Components/UI/Confirmation",
  component: Confirmation,
};

export default meta;

type Story = StoryObj<typeof Confirmation>;

export const BasicConfirmation: Story = {
  args: {
    title: "Confirm?",
    children: "Do you want to perform this action",
    callback: async (confirm: boolean) => {
      action(confirm ? "Action confirmed" : "Action canceled")();
    },
  },
};

export const UseConfirmation: Story = {
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
        <button onClick={() => setConfirmation(true)}>Click on me</button>
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
    children: (
      <div>
        <button>Click on me</button>
        <hr />
      </div>
    ),
  },
  render: (props) => (
    <UIContextProvider {...useUIProviderProps()}>
      <ConfirmationAction {...props} />
    </UIContextProvider>
  ),
};

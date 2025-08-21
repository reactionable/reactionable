import { action } from "storybook/actions";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { UIContextProvider } from "../../UI";
import { Delete } from "./Delete";

const meta: Meta<typeof Delete> = {
  title: "UI Material/Components/Crud/Delete",
  component: Delete,
};

export default meta;

type Story = StoryObj<typeof Delete>;

export const BasicDelete: Story = {
  args: {
    title: "Basic delete",
    confirmationMessage: "Do you want to delete?",
    successMessage: "The deletion has been done",
    onConfirm: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      action("Action confirmed")();
      return "ok";
    },
    onSuccess: action("Action succeed"),
    children: "Click on me",
  },
  render: (props) => (
    <UIContextProvider>
      <Delete {...props} />
    </UIContextProvider>
  ),
};

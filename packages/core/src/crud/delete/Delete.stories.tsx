import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import { UIContextProvider, useUIProviderProps } from "../../ui/UI";
import { Delete } from "./Delete";

const meta: Meta<typeof Delete> = {
  title: "Core/Components/Crud/Delete",
  component: Delete,
};

export default meta;

type Story = StoryObj<typeof Delete>;

export const BasicDelete: Story = {
  args: {
    title: "Basic label",
    confirmationMessage: "Do you want to delete?",
    successMessage: "The deletion has been done",
    onConfirm: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      action("Action confirmed")();
      return "ok";
    },
    onSuccess: action("Action succeed"),
    children: <button>Click on me</button>,
  },
  render: (props) => (
    <UIContextProvider {...useUIProviderProps()}>
      <Delete {...props} />
    </UIContextProvider>
  ),
};

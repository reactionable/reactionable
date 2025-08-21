import type { Meta, StoryObj } from "@storybook/react-vite";

import { NotFound } from "./NotFound";

const meta: Meta<typeof NotFound> = {
  title: "Core/Components/UI/Layout/NotFound",
  component: NotFound,
};

export default meta;

type Story = StoryObj<typeof NotFound>;

export const BasicNotFound: Story = {};

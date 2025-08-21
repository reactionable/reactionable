import type { Meta, StoryObj } from "@storybook/react-vite";

import { Footer } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "Core/Components/UI/Layout/Footer",
  component: Footer,
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const BasicFooter: Story = {
  args: {
    brand: "Test Brand",
    sponsor: true,
  },
};

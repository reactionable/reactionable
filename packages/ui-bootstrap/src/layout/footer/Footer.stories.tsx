import "../../../stories/config";

import type { Meta, StoryObj } from "@storybook/react";

import { Footer } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "UI Bootstrap/Components/Layout/Footer",
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

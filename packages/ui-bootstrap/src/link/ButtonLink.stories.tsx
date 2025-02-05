import type { Meta, StoryObj } from "@storybook/react";

import { ButtonLink } from "./ButtonLink";

const meta: Meta<typeof ButtonLink> = {
  title: "UI Bootstrap/Components/Link/ButtonLink",
  component: ButtonLink,
};

export default meta;

type Story = StoryObj<typeof ButtonLink>;

export const BasicButtonLink: Story = {
  args: {
    href: "/test",
    children: "Test",
    variant: "danger",
  },
};

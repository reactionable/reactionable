import type { Meta, StoryObj } from "@storybook/react";

import { Link, useLink } from "./Link";

const meta: Meta<typeof Link> = {
  title: "UI Material/Components/Link",
  component: Link,
};

export default meta;

type Story = StoryObj<typeof Link>;

export const BasicLink: Story = {
  args: {
    href: "/test",
    children: "Test",
  },
};

export const UseLink: StoryObj<typeof useLink> = {
  args: {
    href: "/test",
    children: "Test",
  },
  render: (props) => useLink(props),
};

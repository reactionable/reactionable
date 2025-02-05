import Star from "@material-ui/icons/Star";
import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "UI Material/Components/Icon",
  component: Icon,
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const BasicIcon: Story = {
  args: {
    icon: Star,
    color: "primary",
  },
};

export const IconWithComponentAsProp: Story = {
  args: Star,
};

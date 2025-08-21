import { faAtom } from "@fortawesome/free-solid-svg-icons";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "UI Bootstrap/Components/Icon",
  component: Icon,
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const BasicIcon: Story = {
  args: {
    icon: faAtom,
    color: "primary",
  },
};

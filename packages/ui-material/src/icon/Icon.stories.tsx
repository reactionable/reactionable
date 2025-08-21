import Star from "@mui/icons-material/Star";
import type { Meta, StoryObj } from "@storybook/react-vite";

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

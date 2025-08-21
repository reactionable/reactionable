import type { Meta, StoryObj } from "@storybook/react-vite";

import { UIContextProvider, useUIProviderProps } from "../ui/UI";
import { NavItem } from "./NavItem";

const meta: Meta<typeof NavItem> = {
  title: "Core/Components/Nav/NavItem",
  component: NavItem,
};

export default meta;

type Story = StoryObj<typeof NavItem>;

export const BasicNavItem: Story = {
  args: {
    href: "/test",
    children: "Test",
  },
  render: (props) => (
    <UIContextProvider {...useUIProviderProps()}>
      <NavItem {...props} />
    </UIContextProvider>
  ),
};

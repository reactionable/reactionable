import SaveIcon from "@mui/icons-material/Save";
import type { Meta, StoryObj } from "@storybook/react";

import { TestWrapper } from "../testing/TestWrapper";
import { NavItem } from "./NavItem";

const meta: Meta<typeof NavItem> = {
  title: "UI Material/Components/Nav/NavItem",
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
    <TestWrapper>
      <NavItem {...props} />
    </TestWrapper>
  ),
};

export const NavItemWithIcon: Story = {
  args: {
    href: "/test",
    children: "Test",
    icon: SaveIcon,
  },
  render: (props) => (
    <TestWrapper>
      <NavItem {...props} />
    </TestWrapper>
  ),
};

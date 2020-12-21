import SaveIcon from "@material-ui/icons/Save";
import { ReactElement } from "react";

import { TestWrapper } from "../testing/TestWrapper";
import { NavItem } from "./NavItem";

export default {
  title: "UI Material/Components/NavItem",
  parameters: {
    component: NavItem,
  },
};

export const BasicNavItem = (): ReactElement => (
  <TestWrapper>
    <NavItem href="/test">Test</NavItem>
  </TestWrapper>
);

export const NavItemWithIcon = (): ReactElement => (
  <TestWrapper>
    <NavItem href="/test" icon={SaveIcon}>
      Test
    </NavItem>
  </TestWrapper>
);

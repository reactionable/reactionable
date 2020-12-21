import { faAtom } from "@fortawesome/free-solid-svg-icons";
import { ReactElement } from "react";

import { TestWrapper } from "../testing/TestWrapper";
import { NavItem } from "./NavItem";

export default {
  title: "UI Bootstrap/Components/NavItem",
  parameters: { component: NavItem },
};

export const BasicNavItem = (): ReactElement => (
  <TestWrapper>
    <NavItem href="/test">Test</NavItem>
  </TestWrapper>
);

export const NavItemWithIcon = (): ReactElement => (
  <TestWrapper>
    <NavItem href="/test" icon={{ icon: faAtom }}>
      Test
    </NavItem>
  </TestWrapper>
);

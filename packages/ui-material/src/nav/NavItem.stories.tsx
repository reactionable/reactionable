import SaveIcon from "@material-ui/icons/Save";
import { ReactElement } from "react";

import { UIContextProvider } from "../UI";
import { NavItem } from "./NavItem";

export default {
  title: "UI Material/Components/NavItem",
  parameters: {
    component: NavItem,
  },
};

export const BasicNavItem = (): ReactElement => (
  <UIContextProvider>
    <NavItem href="/test">Test</NavItem>
  </UIContextProvider>
);

export const NavItemWithIcon = (): ReactElement => (
  <UIContextProvider>
    <NavItem href="/test" icon={SaveIcon}>
      Test
    </NavItem>
  </UIContextProvider>
);

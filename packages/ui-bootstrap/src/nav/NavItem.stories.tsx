import { faAtom } from "@fortawesome/free-solid-svg-icons";
import { ReactElement } from "react";

import { UIContextProvider } from "../UI";
import { NavItem } from "./NavItem";

export default {
  title: "UI Bootstrap/Components/NavItem",
  parameters: { component: NavItem },
};

export const BasicNavItem = (): ReactElement => (
  <UIContextProvider>
    <NavItem href="/test">Test</NavItem>
  </UIContextProvider>
);

export const NavItemWithIcon = (): ReactElement => (
  <UIContextProvider>
    <NavItem href="/test" icon={{ icon: faAtom }}>
      Test
    </NavItem>
  </UIContextProvider>
);

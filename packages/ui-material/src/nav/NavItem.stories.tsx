import { ReactElement } from "react";

import { UIContextProvider } from "../UI";
import { NavItem } from "./NavItem";

export default {
  title: "UI Material/Components/NavItem",
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    component: NavItem,
  },
};

export const BasicNavItem = (): ReactElement => (
  <UIContextProvider>
    <NavItem>Test</NavItem>
  </UIContextProvider>
);

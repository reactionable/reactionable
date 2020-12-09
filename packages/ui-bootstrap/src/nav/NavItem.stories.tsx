import React, { ReactElement } from "react";
import { UIContextProvider } from "../UI";

import { NavItem } from "./NavItem";

export default {
  title: "UI Bootstrap/Components/NavItem",
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

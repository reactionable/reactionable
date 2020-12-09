import React, { ReactElement } from "react";
import { UIContextProvider, useUIProviderProps } from "../ui/UI";

import { NavItem } from "./NavItem";

export default {
  title: "Core/Components/NavItem",
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    component: NavItem,
  },
};

export const BasicNavItem = (): ReactElement => (
  <UIContextProvider {...useUIProviderProps()}>
    <NavItem>Test</NavItem>
  </UIContextProvider>
);

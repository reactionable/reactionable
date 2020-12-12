import { ReactElement } from "react";

import { UIContextProvider, useUIProviderProps } from "../ui/UI";
import { NavItem } from "./NavItem";

export default {
  title: "Core/Components/Nav/NavItem",
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    component: NavItem,
  },
};

export const BasicNavItem = (): ReactElement => (
  <UIContextProvider {...useUIProviderProps()}>
    <NavItem href="/test">Test</NavItem>
  </UIContextProvider>
);

import React, { ComponentProps, ComponentType, PropsWithChildren, ReactElement } from "react";

import { INavItemProps, INavItemsProps, NavItems } from "../../../nav/NavItem";
import {
  INavItemsProviderProps,
  createNavItemsContextProvider,
} from "../../../nav/NavItemsContextProvider";

export type ISidebarProps<
  NavItemsProps extends INavItemsProps<INavItemProps>,
  SidebarComponent extends ComponentType = ComponentType
> = Partial<Omit<INavItemsProviderProps<NavItemsProps>, "Component">> & {
  Component?: SidebarComponent;
  sidebar?: ComponentProps<SidebarComponent>;
};

export const {
  NavItemsContextProvider: SidebarContextProvider,
  useNavItemsContext: useSidebarContext,
} = createNavItemsContextProvider<INavItemsProps<INavItemProps>>();

export function SidebarComponent({ children }: PropsWithChildren<unknown>): ReactElement {
  const { navItems } = useSidebarContext();

  return (
    <div>
      <div>
        <ul>
          <NavItems navItems={navItems} />
        </ul>
      </div>
      <div>{children}</div>
    </div>
  );
}

export function Sidebar<NavItemsProps extends INavItemsProps<INavItemProps>>({
  children,
  Component,
  sidebar,
  ...props
}: PropsWithChildren<ISidebarProps<NavItemsProps>>): ReactElement {
  if (!Component) {
    Component = SidebarComponent;
  }

  return (
    <SidebarContextProvider {...props}>
      <Component {...sidebar}>{children}</Component>
    </SidebarContextProvider>
  );
}

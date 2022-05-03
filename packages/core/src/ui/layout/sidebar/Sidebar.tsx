import { ComponentProps, ComponentType, PropsWithChildren, ReactElement } from "react";

import { INavItemProps, INavItemsProps, NavItems } from "../../../nav/NavItem";
import { createNavItemsContextProvider } from "../../../nav/NavItemsContextProvider";
import { INavItemsProviderProps } from "../../../nav/NavItemsProviderProps";

export type ISidebarComponent = ComponentType<PropsWithChildren<unknown>>;

export type ISidebarProps<
  NavItemsProps extends INavItemsProps<INavItemProps>,
  SidebarComponent extends ISidebarComponent = ISidebarComponent
> = Partial<Omit<INavItemsProviderProps<NavItemsProps>, "Component">> &
  PropsWithChildren<{
    Component?: SidebarComponent;
    sidebar?: Omit<ComponentProps<SidebarComponent>, "children">;
  }>;

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
  Component,
  sidebar,
  children,
  ...props
}: ISidebarProps<NavItemsProps>): ReactElement {
  if (!Component) {
    Component = SidebarComponent;
  }

  return (
    <SidebarContextProvider {...props}>
      <Component {...sidebar}>{children}</Component>
    </SidebarContextProvider>
  );
}

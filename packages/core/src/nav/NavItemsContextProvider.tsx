import { ComponentType, Context, PropsWithChildren, ReactElement } from "react";

import { IProviderProps, createProvider } from "../app/Provider";
import { INavItemsProviderProps, useNavItemsProviderProps } from "./NavItemsProviderProps";
import { INavItemProps, INavItemsProps } from "./NavItem";

type INavItemsContextProvider<NavItemsProps extends INavItemsProps<INavItemProps>> = ComponentType<
  PropsWithChildren<Partial<INavItemsProviderProps<NavItemsProps>>>
>;

export type INavItemsContextProviderResult<NavItemsProps extends INavItemsProps<INavItemProps>> = {
  NavItemsContext: Context<IProviderProps<INavItemsProviderProps<NavItemsProps>>>;
  useNavItemsContext: () => INavItemsProviderProps<NavItemsProps>;
  NavItemsContextProvider: INavItemsContextProvider<NavItemsProps>;
};

export function createNavItemsContextProvider<NavItemsProps extends INavItemsProps<INavItemProps>>(
  props?: Partial<INavItemsProviderProps<NavItemsProps>>
): INavItemsContextProviderResult<NavItemsProps> {
  const navItemsProviderProps = {
    navItems: [],
    setNavItems: (navItems: NavItemsProps["navItems"]) => {
      navItems;
    },
    ...props,
  } as INavItemsProviderProps<NavItemsProps>;

  const { Context: NavItemsContext, useContext: useNavItemsContext } =
    createProvider<INavItemsProviderProps<NavItemsProps>>(navItemsProviderProps);

  const NavItemsContextProvider = ({
    children,
    ...props
  }: PropsWithChildren<Partial<INavItemsProviderProps<NavItemsProps>>>): ReactElement => {
    const value = useNavItemsProviderProps(props);
    return <NavItemsContext.Provider value={value}>{children}</NavItemsContext.Provider>;
  };

  return { NavItemsContext, useNavItemsContext, NavItemsContextProvider };
}

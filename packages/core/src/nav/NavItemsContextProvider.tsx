import {
  ComponentType,
  Context,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from "react";
import isEqual from "react-fast-compare";

import { IProviderProps, createProvider } from "../app/Provider";
import { INavItemProps, INavItemsProps } from "./NavItem";

export type INavItemsProviderProps<
  NavItemsProps extends INavItemsProps<INavItemProps>
> = IProviderProps<{
  navItems: NavItemsProps["navItems"];
  setNavItems: (navItems: NavItemsProps["navItems"]) => void;
}>;

export type NavItemType<C extends INavItemsProps<INavItemProps>> = C extends INavItemsProps<infer N>
  ? N extends INavItemProps
    ? N
    : INavItemProps
  : INavItemProps;

export function useNavItemsProviderProps<NavItemsProps extends INavItemsProps<INavItemProps>>(
  props?: Partial<INavItemsProviderProps<NavItemsProps>>
): INavItemsProviderProps<NavItemsProps> {
  const [navItems, internalSetNavItems] = useState<NavItemType<NavItemsProps>[]>(
    (props?.navItems ?? []) as NavItemType<NavItemsProps>[]
  );

  const setNavItems = (navItems: NavItemType<NavItemsProps>[]) => {
    useEffect(() => {
      internalSetNavItems((originNavItems) => {
        if (isEqual(originNavItems, navItems)) {
          return originNavItems;
        }
        return navItems;
      });
    }, [navItems, internalSetNavItems]);
  };

  return { navItems, setNavItems, ...props } as INavItemsProviderProps<NavItemsProps>;
}

export type INavItemsContextProviderResult<NavItemsProps extends INavItemsProps<INavItemProps>> = {
  NavItemsContext: Context<IProviderProps<INavItemsProviderProps<NavItemsProps>>>;
  useNavItemsContext: () => INavItemsProviderProps<NavItemsProps>;
  NavItemsContextProvider: ComponentType<Partial<INavItemsProviderProps<NavItemsProps>>>;
};

export function createNavItemsContextProvider<NavItemsProps extends INavItemsProps<INavItemProps>>(
  props?: Partial<INavItemsProviderProps<NavItemsProps>>
): INavItemsContextProviderResult<NavItemsProps> {
  const { Context: NavItemsContext, useContext: useNavItemsContext } = createProvider<
    INavItemsProviderProps<NavItemsProps>
  >({
    navItems: [],
    setNavItems: (navItems: NavItemsProps["navItems"]) => {
      navItems;
    },
    ...props,
  } as INavItemsProviderProps<NavItemsProps>);

  const NavItemsContextProvider = ({
    ...props
  }: PropsWithChildren<Partial<INavItemsProviderProps<NavItemsProps>>>): ReactElement => {
    const value = useNavItemsProviderProps(props);
    return <NavItemsContext.Provider value={value}>{props.children}</NavItemsContext.Provider>;
  };

  return { NavItemsContext, useNavItemsContext, NavItemsContextProvider };
}

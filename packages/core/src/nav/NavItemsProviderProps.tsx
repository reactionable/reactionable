import { useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import { IProviderProps } from "../app/Provider";
import { INavItemProps, INavItemsProps } from "./NavItem";

export type INavItemsProviderProps<NavItemsProps extends INavItemsProps<INavItemProps>> =
  IProviderProps<{
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

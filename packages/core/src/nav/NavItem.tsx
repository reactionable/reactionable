import React, { ComponentType, ReactElement } from "react";

import { ILinkProps, Link } from "../router/Link";

export type INavItemProps = ILinkProps;

export type INavItemsProps<NavItemProps extends INavItemProps> = {
  navItems?: Array<NavItemProps>;
};

export function NavItem<NavItemProps extends INavItemProps>({
  ...props
}: NavItemProps): ReactElement {
  return <Link {...(props as NavItemProps)} />;
}

export type INavItemsComponentProps<NavItemProps extends INavItemProps> = INavItemsProps<
  NavItemProps
> & {
  Component?: ComponentType<NavItemProps>;
};

export function NavItems<NavItemProps extends INavItemProps>({
  navItems,
  Component,
}: INavItemsComponentProps<NavItemProps>): ReactElement | null {
  if (!navItems?.length) {
    return null;
  }

  if (!Component) {
    Component = NavItem;
  }

  const navItemsContent: ReactElement[] = [];
  for (const navItem of navItems) {
    navItemsContent.push(<Component key={`${navItem.href}`} {...(navItem as NavItemProps)} />);
  }
  return <>{navItemsContent}</>;
}

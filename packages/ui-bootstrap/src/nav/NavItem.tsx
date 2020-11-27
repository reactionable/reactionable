import {
  NavItem as CoreNavItem,
  NavItems as CoreNavItems,
  INavItemProps as ICoreNavItemProps,
  INavItemsComponentProps,
} from "@reactionable/core/lib/nav/NavItem";
import React, { ReactElement } from "react";
import NavLink, { NavLinkProps } from "react-bootstrap/NavLink";

import { IIconProps, Icon } from "../icon/icon";

export type INavItemProps = ICoreNavItemProps &
  Omit<NavLinkProps, "onSelect"> & { icon?: IIconProps };

export function NavItem({ icon, href, children, ...linkProps }: INavItemProps): ReactElement {
  if (!linkProps.title && typeof children === "string") {
    const title: string = children as string;
    linkProps.title = title;
  }

  if (icon) {
    children = (
      <>
        <Icon {...icon} /> {children}
      </>
    );
  }
  return (
    <CoreNavItem href={href}>
      <NavLink {...linkProps}>{children}</NavLink>
    </CoreNavItem>
  );
}

export function NavItems(props: INavItemsComponentProps<INavItemProps>): ReactElement | null {
  return <CoreNavItems<INavItemProps> Component={NavItem} {...props} />;
}

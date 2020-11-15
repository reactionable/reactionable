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

export function NavItem(props: INavItemProps): ReactElement {
  const { icon, href, ...linkProps } = props;
  if (icon) {
    linkProps.children = (
      <>
        <Icon {...icon} /> {linkProps.children}
      </>
    );
  }
  return (
    <CoreNavItem href={href}>
      <NavLink {...linkProps} />
    </CoreNavItem>
  );
}

export function NavItems(props: INavItemsComponentProps<INavItemProps>): ReactElement | null {
  return <CoreNavItems<INavItemProps> Component={NavItem} {...props} />;
}

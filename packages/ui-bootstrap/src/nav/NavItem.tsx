import {
  NavItems as CoreNavItems,
  INavItemProps as ICoreNavItemProps,
  INavItemsComponentProps,
} from "@reactionable/core/lib/nav/NavItem";
import { ReactElement } from "react";
import NavLink, { NavLinkProps } from "react-bootstrap/NavLink";

import { IIconProps, Icon } from "../icon/Icon";
import { Link } from "../link/Link";

export type INavItemProps = ICoreNavItemProps &
  Omit<NavLinkProps, "onSelect"> & { icon?: IIconProps };

export function NavItem({ icon, children, ...linkProps }: INavItemProps): ReactElement {
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
    <NavLink {...(linkProps as NavLinkProps)} as={Link}>
      {children}
    </NavLink>
  );
}

export function NavItems(props: INavItemsComponentProps<INavItemProps>): ReactElement | null {
  return <CoreNavItems<INavItemProps> Component={NavItem} {...props} />;
}

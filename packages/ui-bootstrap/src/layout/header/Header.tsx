import { IHeaderProps as ICoreHeaderProps } from "@reactionable/core/lib/ui/layout/header/Header";
import React, { ComponentType, PropsWithChildren, ReactElement } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar, { NavbarProps } from "react-bootstrap/Navbar";

import { isLinkProps } from "../../link/Link";
import { INavItemProps, NavItems } from "../../nav/NavItem";
import { useUIContext } from "../../UI";
import { UserHeaderNav } from "./UserHeaderNav";

export type IHeaderProps = ICoreHeaderProps<INavItemProps> & NavbarProps;
export type HeaderComponent = ComponentType<IHeaderProps>;

export const Header = ({
  brand,
  navItems = [],
  UserHeaderNavComponent,
  ...navbarProps
}: PropsWithChildren<IHeaderProps>): ReactElement => {
  let brandContent: ReactElement | null = null;
  const { useLink } = useUIContext();

  if (brand) {
    if (isLinkProps(brand)) {
      const { href, ...navbarBrandProps } = brand;
      brandContent = useLink({ href, children: <Navbar.Brand {...navbarBrandProps} /> });
    } else {
      brandContent = useLink({ href: "/", children: <Navbar.Brand>{brand}</Navbar.Brand> });
    }
  }

  if (!UserHeaderNavComponent) {
    UserHeaderNavComponent = UserHeaderNav;
  }

  return (
    <Navbar expand="lg" {...navbarProps}>
      {brandContent}
      <Navbar.Toggle aria-controls="main-navbar-nav" />
      <Navbar.Collapse id="main-navbar-nav">
        <Nav className="mr-auto">
          <NavItems navItems={navItems} />
        </Nav>
        <UserHeaderNavComponent />
      </Navbar.Collapse>
    </Navbar>
  );
};

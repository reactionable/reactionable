import { useRouterContext } from "@reactionable/core";
import { isLinkProps } from "@reactionable/core/lib/router/Link";
import { IHeaderProps as ICoreHeaderProps } from "@reactionable/core/lib/ui/layout/header/Header";
import React, { ComponentType, PropsWithChildren, ReactElement } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar, { NavbarProps } from "react-bootstrap/Navbar";

import { INavItemProps, NavItems } from "../../nav/NavItem";
import { UserHeaderNav } from "./UserHeaderNav";

export type IHeaderProps = ICoreHeaderProps<INavItemProps> & NavbarProps;
export type HeaderComponent = ComponentType<IHeaderProps>;

export const Header = ({
  brand,
  navItems = [],
  ...navbarProps
}: PropsWithChildren<IHeaderProps>): ReactElement => {
  let brandContent: ReactElement | null = null;
  const { RouterLink } = useRouterContext();

  if (brand) {
    if (isLinkProps(brand)) {
      const { href, ...navbarBrandProps } = brand;
      brandContent = (
        <RouterLink href={href}>
          <Navbar.Brand {...navbarBrandProps} />
        </RouterLink>
      );
    } else {
      brandContent = (
        <RouterLink href="/">
          <Navbar.Brand href="/">{brand}</Navbar.Brand>
        </RouterLink>
      );
    }
  }

  return (
    <Navbar expand="lg" {...navbarProps}>
      {brandContent}
      <Navbar.Toggle aria-controls="main-navbar-nav" />
      <Navbar.Collapse id="main-navbar-nav">
        <Nav className="mr-auto">
          <NavItems navItems={navItems} />
        </Nav>
        <UserHeaderNav />
      </Navbar.Collapse>
    </Navbar>
  );
};

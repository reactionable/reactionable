import { Link, isLinkProps } from '@reactionable/core/lib/router/Link';
import { IHeaderProps as ICoreHeaderProps } from '@reactionable/core/lib/ui/layout/header/Header';
import React, { ComponentType, PropsWithChildren, ReactNode } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar, { NavbarProps } from 'react-bootstrap/Navbar';

import { INavItemProps, navItemToComponent } from '../../nav/NavItem';
import { UserHeaderNav } from './UserHeaderNav';

export type IHeaderProps = ICoreHeaderProps<INavItemProps> & NavbarProps;
export type HeaderComponent = ComponentType<IHeaderProps>;

export const Header = ({
  brand,
  navItems = [],
  ...navbarProps
}: PropsWithChildren<IHeaderProps>) => {
  let brandContent: ReactNode = <></>;

  if (brand) {
    brandContent = isLinkProps(brand) ? (
      <Navbar.Brand as={Link} {...brand} />
    ) : (
      <Navbar.Brand as={Link} href="/">
        {brand}
      </Navbar.Brand>
    );
  }

  return (
    <Navbar expand="lg" {...navbarProps}>
      {brandContent}
      <Navbar.Toggle aria-controls="main-navbar-nav" />
      <Navbar.Collapse id="main-navbar-nav">
        <Nav className="mr-auto">{navItems?.map(navItemToComponent)}</Nav>
        <UserHeaderNav />
      </Navbar.Collapse>
    </Navbar>
  );
};

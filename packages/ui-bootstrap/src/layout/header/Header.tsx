import { useIdentityContext } from '@reactionable/core/lib/identity/Identity';
import {
  IHeaderProps as ICoreHeaderProps,
  isLinkProps,
} from '@reactionable/core/lib/ui/layout/header/Header';
import React, { PropsWithChildren, ReactElement, ReactNode, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar, { NavbarProps } from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useModal } from '../../modal/Modal';
import { INavItem, navItemToComponent } from '../../nav/NavItem';

export type IHeaderProps = ICoreHeaderProps<INavItem, NavbarProps>;

export function Header({ brand, navItems = [], ...navbarProps }: PropsWithChildren<IHeaderProps>) {
  const { t } = useTranslation();
  const { user, logout, component, identityProvider } = useIdentityContext();
  const { modal, openModal, closeModal } = useModal({
    title: t('Sign In / Sign Up'),
    body: component,
  });

  useEffect(() => {
    if (user) {
      closeModal();
    }
  }, [user]);

  const userMenuItems: Array<ReactNode> = [];
  let identityModal = undefined;

  if (identityProvider) {
    if (user) {
      userMenuItems.push(
        <NavDropdown key="userNav" id="userNav" title={user.displayName()}>
          <NavDropdown.Item as={Link} to="/account">
            {t('My account')}
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item as={Link} to="#" onClick={logout}>
            {t('Log out')}
          </NavDropdown.Item>
        </NavDropdown>
      );
    } else if (user === null) {
      const handleOnClick = () => openModal();
      userMenuItems.push(
        <Nav.Link as={Link} to="#" key="signup_signin" onClick={handleOnClick}>
          {t('Sign In / Sign Up')}
        </Nav.Link>
      );

      identityModal = modal;
    }
  }

  let brandContent: ReactElement = <></>;
  if (brand) {
    brandContent = isLinkProps(brand) ? (
      <Navbar.Brand as={Link} {...brand} />
    ) : (
      <Navbar.Brand as={Link} to="/">
        {brand}
      </Navbar.Brand>
    );
  }

  return (
    <>
      {identityModal}
      <Navbar expand="lg" {...navbarProps}>
        {brandContent}
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="mr-auto">{navItems?.map(navItemToComponent)}</Nav>
          {userMenuItems.length > 0 && <Nav>{userMenuItems}</Nav>}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

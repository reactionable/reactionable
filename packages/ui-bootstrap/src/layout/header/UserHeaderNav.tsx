import { useIdentityContext } from '@reactionable/core/lib/identity/Identity';
import { Link } from '@reactionable/core/lib/router/Link';
import React, { ComponentType, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';

import { Modal, useModal } from '../../modal/Modal';

const UserLoggedHeaderNav = () => {
  const { user, logout } = useIdentityContext();
  const { t } = useTranslation();

  if (!user) {
    return <></>;
  }

  return (
    <NavDropdown key="userNav" id="userNav" title={user.displayName()}>
      <NavDropdown.Item as={Link} href="/account">
        {t('My account')}
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item as={Link} href="#" onClick={logout}>
        {t('Log out')}
      </NavDropdown.Item>
    </NavDropdown>
  );
};

const UserUnloggedHeaderNav = () => {
  const { t } = useTranslation();
  const { user, component } = useIdentityContext();
  const { modal, openModal, closeModal } = useModal({
    Component: Modal,
    title: t('Sign In / Sign Up'),
    body: component,
  });

  useEffect(() => {
    if (user) {
      closeModal();
    }
  }, [user]);

  if (user) {
    return <></>;
  }
  const handleOnClick = () => openModal();

  return (
    <>
      {modal}
      <Nav.Link as={Link} href="#" key="signup_signin" onClick={handleOnClick}>
        {t('Sign In / Sign Up')}
      </Nav.Link>
    </>
  );
};

export type IUserHeaderProps = {};
export type UserHeaderNavComponent<H extends IUserHeaderProps = IUserHeaderProps> = ComponentType<
  H
>;

export const UserHeaderNav: UserHeaderNavComponent = () => {
  const { identityProvider } = useIdentityContext();

  if (!identityProvider) {
    return <></>;
  }

  return (
    <div>
      <UserLoggedHeaderNav />,
      <UserUnloggedHeaderNav />,
    </div>
  );
};

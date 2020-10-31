import React, { ComponentType, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useIdentityContext } from '../../../identity/Identity';
import { Link } from '../../../router/Link';
import { useUIContext } from '../../UI';

export const UserLoggedHeaderNav = () => {
  const { user, logout } = useIdentityContext();
  const { t } = useTranslation();

  if (!user) {
    return <></>;
  }

  return (
    <div key="userNav" id="userNav" title={user.displayName()}>
      <Link href="/account">{t('My account')}</Link>
      <Link href="#" onClick={logout}>
        {t('Log out')}
      </Link>
    </div>
  );
};

export const UserUnloggedHeaderNav = () => {
  const { t } = useTranslation();
  const { user, component } = useIdentityContext();
  const { useModal } = useUIContext();

  const { modal, openModal, closeModal } = useModal({
    title: t('Sign In / Sign Up'),
    children: component,
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
      <Link href="#" key="signup_signin" onClick={handleOnClick}>
        {t('Sign In / Sign Up')}
      </Link>
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

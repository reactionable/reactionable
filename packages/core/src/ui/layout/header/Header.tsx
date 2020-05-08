import React, { ReactElement, FC, useEffect } from 'react';
import { LinkProps, Link } from 'react-router-dom';
import { INavItemsProps, INavItem, navItemToComponent } from '../../../nav/NavItem';
import { useTranslation } from 'react-i18next';
import { useIdentityContext } from '../../../identity/Identity';
import { useModal, Modal } from '../../modal/Modal';

export function isLinkProps(brand: string | ReactElement | LinkProps): brand is LinkProps<any> {
  return (brand as LinkProps).to !== undefined;
}

export type IHeaderProps<N extends INavItem = INavItem, P extends {} = {}> = INavItemsProps<N> & {
  brand?: ReactElement | string | LinkProps;
} & P;

export type HeaderComponent<H extends IHeaderProps<INavItem> = IHeaderProps<INavItem>> = FC<H>;

export const Header: HeaderComponent = ({ brand, navItems = [], ...navbarProps }) => {
  const { t } = useTranslation();
  const { user, logout, component, identityProvider } = useIdentityContext();
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

  const userMenuItems: Array<React.ReactNode> = [];
  let identityModal = undefined;

  if (identityProvider) {
    if (user) {
      userMenuItems.push(
        <div key="userNav" id="userNav" title={user.displayName()}>
          <Link to="/account">{t('My account')}</Link>
          <Link to="#" onClick={logout}>
            {t('Log out')}
          </Link>
        </div>
      );
    } else if (user === null) {
      const handleOnClick = () => openModal();
      userMenuItems.push(
        <Link to="#" key="signup_signin" onClick={handleOnClick}>
          {t('Sign In / Sign Up')}
        </Link>
      );

      identityModal = modal;
    }
  }

  let brandContent: ReactElement = <></>;

  if (brand) {
    brandContent = isLinkProps(brand) ? <Link {...brand} /> : <Link to="/">{brand}</Link>;
  }

  return (
    <>
      {identityModal}
      <div {...navbarProps}>
        {brandContent}
        <div>
          <div>{navItems?.map(navItemToComponent)}</div>
          {userMenuItems.length > 0 && <div>{userMenuItems}</div>}
        </div>
      </div>
    </>
  );
};

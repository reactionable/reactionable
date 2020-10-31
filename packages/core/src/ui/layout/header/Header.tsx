import React, { ComponentType, PropsWithChildren, ReactNode } from 'react';

import { INavItemProps, INavItemsProps, navItemToComponent } from '../../../nav/NavItem';
import { ILinkProps, Link, isLinkProps } from '../../../router/Link';
import { UserHeaderNav } from './UserHeaderNav';

export type IHeaderProps<NavItemProps extends INavItemProps = INavItemProps> = INavItemsProps<
  NavItemProps
> & {
  brand?: ReactNode | ILinkProps;
};

export type HeaderComponent<
  HeaderProps extends IHeaderProps<INavItemProps> = IHeaderProps<INavItemProps>
> = ComponentType<HeaderProps>;

export function Header<
  HeaderProps extends IHeaderProps<INavItemProps> = IHeaderProps<INavItemProps>
>({ brand, navItems = [], ...navbarProps }: PropsWithChildren<HeaderProps>) {
  let brandContent: ReactNode = <></>;

  if (brand) {
    brandContent = isLinkProps(brand) ? <Link {...brand} /> : <Link href="/">{brand}</Link>;
  }

  return (
    <>
      <div {...navbarProps}>
        {brandContent}
        <div>
          <div>{navItems?.map(navItemToComponent)}</div>
          <UserHeaderNav />
        </div>
      </div>
    </>
  );
}

import React, { ComponentType, PropsWithChildren, ReactElement, ReactNode } from "react";

import { INavItemProps, INavItemsProps, NavItems } from "../../../nav/NavItem";
import { Link, isLinkProps } from "../../../router/Link";
import { UserHeaderNav } from "./UserHeaderNav";

export type IHeaderProps<NavItemProps extends INavItemProps> = INavItemsProps<NavItemProps> & {
  brand?: ReactNode | NavItemProps;
};

export type HeaderComponent<HeaderProps extends IHeaderProps<INavItemProps>> = ComponentType<
  HeaderProps
>;

export function Header<
  HeaderProps extends IHeaderProps<INavItemProps> = IHeaderProps<INavItemProps>
>({ brand, navItems = [], ...navbarProps }: PropsWithChildren<HeaderProps>): ReactElement {
  let brandContent: ReactElement | null = null;

  if (brand) {
    const linkProps = isLinkProps(brand) ? brand : { href: "/", children: brand };
    brandContent = <Link {...linkProps} />;
  }

  return (
    <div {...navbarProps}>
      {brandContent}
      <div>
        <div>
          <NavItems navItems={navItems} />
        </div>
        <UserHeaderNav />
      </div>
    </div>
  );
}

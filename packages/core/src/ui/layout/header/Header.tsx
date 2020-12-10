import { ComponentType, PropsWithChildren, ReactElement, ReactNode } from "react";

import { INavItemProps, INavItemsProps, NavItems } from "../../../nav/NavItem";
import { isLinkProps } from "../../link/Link";
import { useUIContext } from "../../UI";
import { UserHeaderNav } from "./UserHeaderNav";

export type IHeaderProps<NavItemProps extends INavItemProps> = INavItemsProps<NavItemProps> & {
  brand?: ReactNode | NavItemProps;
  UserHeaderNavComponent?: ComponentType;
};

export type HeaderComponent<
  HeaderProps extends IHeaderProps<INavItemProps>
> = ComponentType<HeaderProps>;

export function Header<
  HeaderProps extends IHeaderProps<INavItemProps> = IHeaderProps<INavItemProps>
>({
  brand,
  navItems = [],
  UserHeaderNavComponent,
  ...navbarProps
}: PropsWithChildren<HeaderProps>): ReactElement {
  let brandContent: ReactElement | null = null;
  const { useLink } = useUIContext();

  if (brand) {
    const linkProps = isLinkProps(brand) ? brand : { href: "/", children: brand };
    brandContent = useLink(linkProps);
  }

  if (!UserHeaderNavComponent) {
    UserHeaderNavComponent = UserHeaderNav;
  }

  return (
    <header {...navbarProps}>
      {brandContent}
      <div>
        <div>
          <NavItems navItems={navItems} />
        </div>
        <UserHeaderNavComponent />
      </div>
    </header>
  );
}

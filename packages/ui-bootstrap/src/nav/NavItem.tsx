import { INavItemProps as ICoreNavItemProps } from '@reactionable/core/lib/nav/NavItem';
import { ILinkProps, Link } from '@reactionable/core/lib/router/Link';
import React, { ReactNode } from 'react';
import NavLink, { NavLinkProps } from 'react-bootstrap/NavLink';

import { IIconProps, Icon } from '../icon/icon';

export type INavItemProps = ICoreNavItemProps<
  ILinkProps & Omit<NavLinkProps, 'onSelect'> & { icon?: IIconProps }
>;

export function navItemToComponent(props: INavItemProps): ReactNode {
  const { icon, ...linkProps } = props;
  const key = `${linkProps.href}`;
  if (icon) {
    linkProps.children = (
      <>
        <Icon {...icon} /> {linkProps.children}
      </>
    );
  }
  return <NavLink as={Link} key={key} {...linkProps} />;
}

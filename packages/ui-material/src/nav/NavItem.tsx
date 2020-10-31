import { SvgIcon } from '@material-ui/core';
import Link, { LinkProps } from '@material-ui/core/Link/Link';
import { INavItemProps as ICoreNavItemProps } from '@reactionable/core/lib/nav/NavItem';
import { Link as CoreLink } from '@reactionable/core/lib/router/Link';
import React, { ReactNode } from 'react';

export type INavItemProps = ICoreNavItemProps<LinkProps & { icon?: typeof SvgIcon }>;

export function navItemToComponent(props: INavItemProps): ReactNode {
  const { icon, ...linkProps } = props;
  const key = `${linkProps.href}`;
  if (icon) {
    linkProps.children = (
      <>
        {icon} {linkProps.children}
      </>
    );
  }
  return <Link key={key} component={CoreLink} {...linkProps} />;
}

import React, { ReactElement } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { INavItem as ICoreNavItem } from '@reactionable/core';
import NavLink, { NavLinkProps } from 'react-bootstrap/NavLink';

export type INavItem = (ICoreNavItem & NavLinkProps & { icon?: any });

export function navItemToComponent(props: INavItem): ReactElement {
    const { icon, ...linkProps } = props;
    const key = `${linkProps.to}`;
    if (icon) {
        linkProps.children = <><FontAwesomeIcon icon={icon} /> {linkProps.children}</>;
    }
    return <NavLink as={Link} key={key} {...linkProps as LinkProps<any> & NavLinkProps} />;
}
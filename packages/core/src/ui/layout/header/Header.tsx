import { ReactElement, FC } from 'react';
import { LinkProps } from 'react-router-dom';
import { INavItemsProps, INavItem } from '../../../nav/NavItem';

export type IHeaderProps<N extends INavItem = INavItem, P extends {} = {}> = INavItemsProps<N> & {
    brand?: ReactElement | string | LinkProps;
} & P;

export type HeaderComponent<H extends IHeaderProps<INavItem> = IHeaderProps<INavItem>> = FC<H>;
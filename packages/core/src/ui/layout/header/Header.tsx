import { ReactElement, FC } from 'react';
import { INavItemsProps, INavItem } from '../../../nav/NavItem';

export interface IHeaderProps<N extends INavItem = INavItem> extends INavItemsProps<N> {
    brand?: ReactElement | string;
};

export type HeaderComponent<H extends IHeaderProps<INavItem> = IHeaderProps<INavItem>> = FC<H>;
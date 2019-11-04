import * as React from 'react';

export interface IHeaderProps {
    brand?: React.ReactElement|string;
    navItems?: React.ReactNode[];
};
export type HeaderComponent<H extends IHeaderProps = IHeaderProps> = React.FC<H>;
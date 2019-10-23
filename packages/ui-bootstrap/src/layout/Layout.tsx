import * as React from 'react';
import { Header, IHeaderProps } from './header/Header';
import { Footer, IFooterProps } from './footer/Footer';

interface IProps {
    header?: IHeaderProps,
    footer?: IFooterProps,
};

export const Layout: React.FC<IProps> = ({
    header = {},
    footer = {},
    children,
}) => {
    return <>
        <Header {...header} />
        <main>{children}</main>
        <Footer {...footer} />
    </>;
};
import React, { LazyExoticComponent } from 'react';
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

export const useLayout = (ComponentToLoad: LazyExoticComponent<any>): LazyExoticComponent<any> => {
    const lazyComponent = (props: any) => {
        return <Layout>
            <ComponentToLoad {...props} />
        </Layout>;
    };
    return lazyComponent as LazyExoticComponent<any>;
};
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

export const useLayout = (ComponentToLoad: React.LazyExoticComponent<any>): React.LazyExoticComponent<any> => {
    const lazyComponent = (props: any) => {
        return <Layout>
            <ComponentToLoad {...props} />
        </Layout>;
    };
    return lazyComponent as React.LazyExoticComponent<any>;
};
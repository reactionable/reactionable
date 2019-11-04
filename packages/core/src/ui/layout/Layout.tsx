import * as React from 'react';
import { FooterComponent, IFooterProps } from './footer/Footer';
import { HeaderComponent, IHeaderProps } from './header/Header';
import { BodyComponent, IBodyProps } from './body/Body';

export interface ILayoutProps<
    H extends IHeaderProps,
    B extends IBodyProps,
    F extends IFooterProps
    > {
    header?: H,
    body?: B,
    footer?: F,
};

export function Layout<
    H extends IHeaderProps,
    B extends IBodyProps,
    F extends IFooterProps
>({
    children,
    header = {} as H,
    body = {} as B,
    footer = {} as F,
    ...components
}: React.PropsWithChildren<ILayoutProps<H, B, F> & {
    HeaderComponent: HeaderComponent<H>,
    BodyComponent: BodyComponent<B>,
    FooterComponent: FooterComponent<F>
}>) {
    const HC = components.HeaderComponent as HeaderComponent<H>;
    const BC = components.BodyComponent;
    const FC = components.FooterComponent;
    return <>    
        <HC {...header} />
        <BC {...body} children={children} />
        <FC {...footer} />
    </>;
};

export type IUseLayoutProps<
    H extends IHeaderProps = IHeaderProps,
    B extends IBodyProps = IBodyProps,
    F extends IFooterProps = IFooterProps
    > = React.PropsWithChildren<ILayoutProps<H, B, F>>;

export type IUseLayoutResult = React.ReactElement;

export type IUseLayout<P extends IUseLayoutProps> = (props: P) => IUseLayoutResult;
export function useLayout<P extends IUseLayoutProps>({
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    children,
    ...props
}: P & {
    HeaderComponent: HeaderComponent,
    BodyComponent: BodyComponent,
    FooterComponent: FooterComponent,
}): IUseLayoutResult {
    return <Layout
        {...{ HeaderComponent, BodyComponent, FooterComponent }}
        {...props}
    >{children}</Layout>
};
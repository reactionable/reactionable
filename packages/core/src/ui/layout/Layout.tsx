import React, { PropsWithChildren, ReactElement } from 'react';
import { FooterComponent, IFooterProps } from './footer/Footer';
import { HeaderComponent, IHeaderProps } from './header/Header';
import { BodyComponent, IBodyProps } from './body/Body';
import { createNavItemContextProvider } from '../../nav/NavItem';

export interface ILayoutProps<
  H extends IHeaderProps,
  B extends IBodyProps,
  F extends IFooterProps
> {
  header?: H;
  body?: B;
  footer?: F;
}

export function Layout<H extends IHeaderProps, B extends IBodyProps, F extends IFooterProps>({
  children,
  header,
  body,
  footer,
  ...components
}: PropsWithChildren<
  ILayoutProps<H, B, F> & {
    HeaderComponent: HeaderComponent<H>;
    BodyComponent: BodyComponent<B>;
    FooterComponent: FooterComponent<F>;
  }
>) {
  const HC = components.HeaderComponent;
  const BC = components.BodyComponent;
  const FC = components.FooterComponent;

  const layoutContent = (
    <>
      {(body || children) && <BC {...(body ?? ({} as B))} children={children} />}
      {footer && <FC {...footer} />}
    </>
  );

  if (!header) {
    return layoutContent;
  }

  const contextProvider = createNavItemContextProvider<H>(header);
  const {
    NavItemContextProvider: HeaderContextProvider,
    NavItemContextConsumer: HeaderContextConsumer,
  } = contextProvider;

  return (
    <HeaderContextProvider {...header}>
      <HeaderContextConsumer>
        {({ setNavItems, ...headerProps }) => (
          <>
            <HC {...(headerProps as H)} /> {layoutContent}
          </>
        )}
      </HeaderContextConsumer>
    </HeaderContextProvider>
  );
}

export type IUseLayoutProps<
  H extends IHeaderProps = IHeaderProps,
  B extends IBodyProps = IBodyProps,
  F extends IFooterProps = IFooterProps
> = PropsWithChildren<ILayoutProps<H, B, F>>;

export type IUseLayoutResult = ReactElement;

export type IUseLayout<P extends IUseLayoutProps> = (props: P) => IUseLayoutResult;

type HeaderPropsType<U extends IUseLayoutProps> = U extends IUseLayoutProps<infer H>
  ? H extends IHeaderProps
    ? H
    : IHeaderProps
  : IHeaderProps;

type BodyPropsType<U extends IUseLayoutProps> = U extends IUseLayoutProps<infer B>
  ? B extends IBodyProps
    ? B
    : IBodyProps
  : IBodyProps;

type FooterPropsType<U extends IUseLayoutProps> = U extends IUseLayoutProps<infer F>
  ? F extends IFooterProps
    ? F
    : IFooterProps
  : IFooterProps;

export function useLayout<P extends IUseLayoutProps>({
  HeaderComponent,
  BodyComponent,
  FooterComponent,
  children,
  ...props
}: P & {
  HeaderComponent: HeaderComponent<HeaderPropsType<P>>;
  BodyComponent: BodyComponent<BodyPropsType<P>>;
  FooterComponent: FooterComponent<FooterPropsType<P>>;
}): IUseLayoutResult {
  return (
    <Layout<any, any, any> {...{ HeaderComponent, BodyComponent, FooterComponent }} {...props}>
      {children}
    </Layout>
  );
}

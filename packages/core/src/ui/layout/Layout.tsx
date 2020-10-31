import React, { PropsWithChildren, ReactNode } from 'react';

import { createNavItemContextProvider } from '../../nav/NavItem';
import { BodyComponent, IBodyProps } from './body/Body';
import { FooterComponent, IFooterProps } from './footer/Footer';
import { HeaderComponent, IHeaderProps } from './header/Header';

export interface ILayoutProps<
  HeaderProps extends IHeaderProps,
  BodyProps extends IBodyProps,
  FooterProps extends IFooterProps
> {
  header?: HeaderProps;
  body?: BodyProps;
  footer?: FooterProps;
}

export function Layout<
  HeaderProps extends IHeaderProps,
  BodyProps extends IBodyProps,
  FooterProps extends IFooterProps
>({
  children,
  header,
  body,
  footer,
  ...components
}: PropsWithChildren<
  ILayoutProps<HeaderProps, BodyProps, FooterProps> & {
    HeaderComponent: HeaderComponent<HeaderProps>;
    BodyComponent: BodyComponent<BodyProps>;
    FooterComponent: FooterComponent<FooterProps>;
  }
>) {
  const Header = components.HeaderComponent;
  const Body = components.BodyComponent;
  const Footer = components.FooterComponent;

  const layoutContent = (
    <>
      {(body || children) && <Body {...(body ?? ({} as BodyProps))} children={children} />}
      {footer && <Footer {...footer} />}
    </>
  );

  if (!header) {
    return layoutContent;
  }

  const contextProvider = createNavItemContextProvider<HeaderProps>(header);
  const {
    NavItemContextProvider: HeaderContextProvider,
    NavItemContextConsumer: HeaderContextConsumer,
  } = contextProvider;

  return (
    <HeaderContextProvider {...header}>
      <HeaderContextConsumer>
        {({ setNavItems, ...headerProps }) => (
          <>
            <Header {...(headerProps as HeaderProps)} /> {layoutContent}
          </>
        )}
      </HeaderContextConsumer>
    </HeaderContextProvider>
  );
}

export type IUseLayoutProps<
  HeaderProps extends IHeaderProps = IHeaderProps,
  BodyProps extends IBodyProps = IBodyProps,
  FooterProps extends IFooterProps = IFooterProps
> = PropsWithChildren<ILayoutProps<HeaderProps, BodyProps, FooterProps>>;

export type IUseLayoutResult = ReactNode;

export type IUseLayout<P extends IUseLayoutProps> = (props: P) => IUseLayoutResult;

type HeaderPropsType<U extends IUseLayoutProps> = U extends IUseLayoutProps<infer HeaderProps>
  ? HeaderProps extends IHeaderProps
    ? HeaderProps
    : IHeaderProps
  : IHeaderProps;

type BodyPropsType<U extends IUseLayoutProps> = U extends IUseLayoutProps<infer BodyProps>
  ? BodyProps extends IBodyProps
    ? BodyProps
    : IBodyProps
  : IBodyProps;

type FooterPropsType<U extends IUseLayoutProps> = U extends IUseLayoutProps<infer FooterProps>
  ? FooterProps extends IFooterProps
    ? FooterProps
    : IFooterProps
  : IFooterProps;

export function useLayout<UseLayoutProps extends IUseLayoutProps>({
  HeaderComponent,
  BodyComponent,
  FooterComponent,
  children,
  ...props
}: UseLayoutProps & {
  HeaderComponent: HeaderComponent<HeaderPropsType<UseLayoutProps>>;
  BodyComponent: BodyComponent<BodyPropsType<UseLayoutProps>>;
  FooterComponent: FooterComponent<FooterPropsType<UseLayoutProps>>;
}): IUseLayoutResult {
  return (
    <Layout<any, any, any> {...{ HeaderComponent, BodyComponent, FooterComponent }} {...props}>
      {children}
    </Layout>
  );
}

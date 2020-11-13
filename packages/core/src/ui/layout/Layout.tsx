import React, { ComponentType, PropsWithChildren, ReactElement } from "react";

import { INavItemProps } from "../../nav/NavItem";
import { createNavItemsContextProvider } from "../../nav/NavItemsContextProvider";
import { BodyComponent, IBodyProps } from "./body/Body";
import { FooterComponent, IFooterProps } from "./footer/Footer";
import { HeaderComponent, IHeaderProps } from "./header/Header";

export interface ILayoutProps<
  HeaderProps extends IHeaderProps<INavItemProps> = IHeaderProps<INavItemProps>,
  BodyProps extends IBodyProps = IBodyProps,
  FooterProps extends IFooterProps = IFooterProps
> {
  header?: HeaderProps;
  body?: BodyProps;
  footer?: FooterProps;
  HeaderComponent: HeaderComponent<HeaderProps>;
  BodyComponent: BodyComponent<BodyProps>;
  FooterComponent: FooterComponent<FooterProps>;
}

export type LayoutComponent<LayoutProps extends ILayoutProps = ILayoutProps> = ComponentType<
  LayoutProps
>;

export function Layout<
  HeaderProps extends IHeaderProps<INavItemProps>,
  BodyProps extends IBodyProps,
  FooterProps extends IFooterProps
>({
  children,
  header,
  body,
  footer,
  ...components
}: PropsWithChildren<ILayoutProps<HeaderProps, BodyProps, FooterProps>>): ReactElement {
  const Header = components.HeaderComponent;
  const Body = components.BodyComponent;
  const Footer = components.FooterComponent;

  const layoutContent = (
    <>
      {(body || children) && <Body {...(body ?? ({} as BodyProps))}>{children}</Body>}
      {footer && <Footer {...footer} />}
    </>
  );

  if (!header) {
    return layoutContent;
  }

  const { NavItemsContextProvider: HeaderContextProvider } = createNavItemsContextProvider<
    HeaderProps
  >(header);

  return (
    <HeaderContextProvider>
      <Header {...(header as HeaderProps)} /> {layoutContent}
    </HeaderContextProvider>
  );
}

export type IUseLayoutProps<LayoutProps extends ILayoutProps = ILayoutProps> = PropsWithChildren<
  LayoutProps & { Component?: LayoutComponent<LayoutProps> }
>;

export type IUseLayoutResult = ReactElement;

export type IUseLayout<UseLayoutProps extends IUseLayoutProps> = (
  props: UseLayoutProps
) => IUseLayoutResult;

export function useLayout<UseLayoutProps extends IUseLayoutProps>({
  Component,
  ...props
}: UseLayoutProps): IUseLayoutResult {
  if (!Component) {
    Component = Layout;
  }
  return <Component {...props} />;
}

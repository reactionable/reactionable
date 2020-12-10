import { ComponentType, PropsWithChildren, ReactElement } from "react";

import { INavItemProps } from "../../nav/NavItem";
import {
  INavItemsProviderProps,
  createNavItemsContextProvider,
} from "../../nav/NavItemsContextProvider";
import { Body, BodyComponent, IBodyProps } from "./body/Body";
import { Footer, FooterComponent, IFooterProps } from "./footer/Footer";
import { Header, HeaderComponent, IHeaderProps } from "./header/Header";

export interface ILayoutProps<
  HeaderProps extends IHeaderProps<INavItemProps> = IHeaderProps<INavItemProps>,
  BodyProps extends IBodyProps = IBodyProps,
  FooterProps extends IFooterProps = IFooterProps
> {
  header?: HeaderProps;
  body?: BodyProps;
  footer?: FooterProps;
  HeaderComponent?: HeaderComponent<HeaderProps>;
  BodyComponent?: BodyComponent<BodyProps>;
  FooterComponent?: FooterComponent<FooterProps>;
}

export type LayoutComponent<
  LayoutProps extends ILayoutProps = ILayoutProps
> = ComponentType<LayoutProps>;

const { NavItemsContextProvider, useNavItemsContext } = createNavItemsContextProvider<
  IHeaderProps<INavItemProps>
>();

export const HeaderContextProvider = NavItemsContextProvider;
export function useHeaderContext<
  HeaderProps extends IHeaderProps<INavItemProps>
>(): INavItemsProviderProps<HeaderProps> {
  return useNavItemsContext();
}

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
  const HeaderComponent = components.HeaderComponent || Header;
  const BodyComponent = components.BodyComponent || Body;
  const FooterComponent = components.FooterComponent || Footer;

  const layoutContent = (
    <>
      {(body || children) && (
        <BodyComponent {...(body ?? ({} as BodyProps))}>{children}</BodyComponent>
      )}
      {footer && <FooterComponent {...footer} />}
    </>
  );

  if (!header) {
    return layoutContent;
  }

  return (
    <HeaderContextProvider>
      <HeaderComponent {...(header as HeaderProps)} />
      {layoutContent}
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

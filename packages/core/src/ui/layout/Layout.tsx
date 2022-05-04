import { ComponentType, PropsWithChildren, ReactElement } from "react";

import { INavItemProps } from "../../nav/NavItem";
import { Body, BodyComponent, IBodyProps } from "./body/Body";
import { Footer, FooterComponent, IFooterProps } from "./footer/Footer";
import { Header, HeaderComponent, IHeaderProps } from "./header/Header";
import { HeaderContextProvider } from "./header/useHeaderContext";

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

export type LayoutComponent<LayoutProps extends ILayoutProps = ILayoutProps> =
  ComponentType<LayoutProps>;

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

  let layoutElement: ReactElement = <></>;

  if (header) {
    const headerElement = <HeaderComponent {...(header as HeaderProps)} />;
    layoutElement = (
      <>
        {layoutElement}
        {headerElement}
      </>
    );
  }

  if (body || children) {
    const bodyElement = <BodyComponent {...(body ?? ({} as BodyProps))}>{children}</BodyComponent>;
    layoutElement = (
      <>
        {layoutElement}
        {bodyElement}
      </>
    );
  }

  if (footer) {
    const footerElement = <FooterComponent {...footer} />;
    layoutElement = (
      <>
        {layoutElement}
        {footerElement}
      </>
    );
  }

  if (header) {
    layoutElement = <HeaderContextProvider>{layoutElement}</HeaderContextProvider>;
  }

  return layoutElement;
}

import {
  INavItemsProviderProps,
  Layout as CoreLayout,
  ILayoutProps as ICoreLayoutProps,
  IUseLayoutProps as ICoreUseLayoutProps,
  IUseLayoutResult,
  useLayout as useLayoutCore,
  useHeaderContext as coreUseHeaderContext,
} from "@reactionable/core";
import { PropsWithChildren, ReactElement } from "react";

import { Body, IBodyProps } from "./body/Body";
import { Footer, IFooterProps } from "./footer/Footer";
import { Header, IHeaderProps } from "./header/Header";

export type ILayoutProps = ICoreLayoutProps<IHeaderProps, IBodyProps, IFooterProps>;

export type IUseLayoutProps = ICoreUseLayoutProps<ILayoutProps>;

export function Layout(props: PropsWithChildren<ILayoutProps>): ReactElement {
  return (
    <CoreLayout
      {...{
        HeaderComponent: Header,
        BodyComponent: Body,
        FooterComponent: Footer,
        ...props,
      }}
    />
  );
}

export function useLayout(props: IUseLayoutProps): IUseLayoutResult {
  return useLayoutCore<IUseLayoutProps>({
    ...props,
    HeaderComponent: Header,
    BodyComponent: Body,
    FooterComponent: Footer,
  });
}

export function useHeaderContext(): INavItemsProviderProps<IHeaderProps> {
  return coreUseHeaderContext<IHeaderProps>();
}

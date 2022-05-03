import { INavItemsProviderProps } from "@reactionable/core/lib/nav/NavItemsProviderProps";
import {
  Layout as CoreLayout,
  ILayoutProps as ICoreLayoutProps,
} from "@reactionable/core/lib/ui/layout/Layout";
import {
  IUseLayoutProps as ICoreUseLayoutProps,
  IUseLayoutResult,
  useLayout as useLayoutCore,
} from "@reactionable/core/lib/ui/layout/useLayout";
import { useHeaderContext as coreUseHeaderContext } from "@reactionable/core/lib/ui/layout/header/useHeaderContext";
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

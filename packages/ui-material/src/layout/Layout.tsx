import { INavItemsProviderProps } from "@reactionable/core/lib/nav/NavItemsContextProvider";
import {
  ILayoutProps as ICoreLayoutProps,
  IUseLayoutProps as ICoreUseLayoutProps,
  IUseLayoutResult,
  useHeaderContext as coreUseHeaderContext,
  useLayout as useLayoutCore,
} from "@reactionable/core/lib/ui/layout/Layout";

import { Body, IBodyProps } from "./body/Body";
import { Footer, IFooterProps } from "./footer/Footer";
import { Header, IHeaderProps } from "./header/Header";

export type ILayoutProps = ICoreLayoutProps<IHeaderProps, IBodyProps, IFooterProps>;

export type IUseLayoutProps = ICoreUseLayoutProps<ILayoutProps>;

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

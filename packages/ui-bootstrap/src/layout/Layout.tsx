import {
  ILayoutProps as ICoreLayoutProps,
  IUseLayoutProps as ICoreUseLayoutProps,
  useLayout as useLayoutCore,
} from '@reactionable/core/lib/ui/layout/Layout';

import { Body, IBodyProps } from './body/Body';
import { Footer, IFooterProps } from './footer/Footer';
import { Header, IHeaderProps } from './header/Header';

export type ILayoutProps = ICoreLayoutProps<IHeaderProps, IBodyProps, IFooterProps>;

export type IUseLayoutProps = ICoreUseLayoutProps<IHeaderProps, IBodyProps, IFooterProps> & {};

export function useLayout(props: IUseLayoutProps) {
  return useLayoutCore<IUseLayoutProps>({
    ...props,
    HeaderComponent: Header,
    BodyComponent: Body,
    FooterComponent: Footer,
  });
}

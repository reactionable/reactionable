import {
    useLayout as useLayoutCore,
    IUseLayoutProps as ICoreUseLayoutProps,
    ILayoutProps as ICoreLayoutProps
} from '@reactionable/core';
import { Header, IHeaderProps } from './header/Header';
import { Body, IBodyProps } from './body/Body';
import { Footer, IFooterProps } from './footer/Footer';

export type ILayoutProps = ICoreLayoutProps<
    IHeaderProps,
    IBodyProps,
    IFooterProps
>;

export type IUseLayoutProps = ICoreUseLayoutProps & {};
export const useLayout = (props: IUseLayoutProps) => {
    return useLayoutCore<IUseLayoutProps>({ 
        ...props,
        HeaderComponent: Header,
        BodyComponent: Body,
        FooterComponent: Footer,
    });
}
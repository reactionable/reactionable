import {
	Layout as CoreLayout,
	useHeaderContext as coreUseHeaderContext,
	type ILayoutProps as ICoreLayoutProps,
	type IUseLayoutProps as ICoreUseLayoutProps,
	type INavItemsProviderProps,
	type IUseLayoutResult,
	useLayout as useLayoutCore,
} from "@reactionable/core";
import type { PropsWithChildren, ReactElement } from "react";

import { Body, type IBodyProps } from "./body/Body";
import { Footer, type IFooterProps } from "./footer/Footer";
import { Header, type IHeaderProps } from "./header/Header";

export type ILayoutProps = ICoreLayoutProps<
	IHeaderProps,
	IBodyProps,
	IFooterProps
>;

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

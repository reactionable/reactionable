import {
	RouterContextProvider as CoreRouterContextProvider,
	type IRouterProviderProps as ICoreRouterProviderProps,
	useRouterContext as useCoreRouterContext,
} from "@reactionable/core";
import type { PropsWithChildren, ReactElement } from "react";
import {
	type IRouterProviderProps,
	useRouterProviderProps,
} from "./useRouterProviderProps";

export const RouterContextProvider = (
	props?: PropsWithChildren<Partial<IRouterProviderProps>>,
): ReactElement => {
	return (
		<CoreRouterContextProvider
			{...(useRouterProviderProps(
				props,
			) as unknown as ICoreRouterProviderProps)}
		/>
	);
};

export function useRouterContext(): IRouterProviderProps {
	return useCoreRouterContext();
}

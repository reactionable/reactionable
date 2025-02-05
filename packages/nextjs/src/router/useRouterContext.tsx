import {
  RouterContextProvider as CoreRouterContextProvider,
  useRouterContext as useCoreRouterContext,
  IRouterProviderProps as ICoreRouterProviderProps,
} from "@reactionable/core";
import { PropsWithChildren, ReactElement } from "react";

import { IRouterLinkProps } from "./RouterLink";
import { useRouterProviderProps } from "./useRouterProviderProps";

export type IRouterProviderProps<
  ExtraProps extends Record<string, unknown> = Record<string, unknown>,
> = ICoreRouterProviderProps<IRouterLinkProps, ExtraProps>;

export const RouterContextProvider = (
  props?: PropsWithChildren<Partial<IRouterProviderProps>>
): ReactElement => {
  return <CoreRouterContextProvider {...useRouterProviderProps(props)} />;
};

export function useRouterContext<
  ExtraProps extends Record<string, unknown> = Record<string, unknown>,
>(): IRouterProviderProps<ExtraProps> {
  return useCoreRouterContext<IRouterLinkProps, ExtraProps>();
}

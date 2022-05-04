import { ReactElement } from "react";
import { createProvider } from "../app/Provider";
import { IRouterLinkProps } from "./RouterLink";
import { IRouterProviderProps, useRouterProviderProps } from "./useRouterProviderProps";

const { Context, ContextProvider, useContext } = createProvider<
  IRouterProviderProps<IRouterLinkProps>
>(useRouterProviderProps());

export function RouterContextProvider<
  RouterLinkProps extends IRouterLinkProps = IRouterLinkProps,
  ExtraProps extends Record<string, unknown> = Record<string, unknown>
>(props: IRouterProviderProps<RouterLinkProps, ExtraProps>): ReactElement {
  return <ContextProvider {...(props as IRouterProviderProps)} />;
}
export const RouterContext = Context;

export function useRouterContext<
  RouterLinkProps extends IRouterLinkProps = IRouterLinkProps,
  ExtraProps extends Record<string, unknown> = Record<string, unknown>
>(): IRouterProviderProps<RouterLinkProps, ExtraProps> {
  return useContext() as unknown as IRouterProviderProps<RouterLinkProps, ExtraProps>;
}

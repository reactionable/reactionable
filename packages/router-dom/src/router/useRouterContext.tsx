import { IRouterProviderProps as ICoreRouterProviderProps } from "@reactionable/core/lib/router/useRouterProviderProps";
import {
  RouterContextProvider as CoreRouterContextProvider,
  useRouterContext as useCoreRouterContext,
} from "@reactionable/core/lib/router/useRouterContext";
import { PropsWithChildren, ReactElement } from "react";
import { IRouterProviderProps, useRouterProviderProps } from "./useRouterProviderProps";

export const RouterContextProvider = (
  props?: PropsWithChildren<Partial<IRouterProviderProps>>
): ReactElement => {
  return (
    <CoreRouterContextProvider
      {...(useRouterProviderProps(props) as unknown as ICoreRouterProviderProps)}
    />
  );
};

export function useRouterContext(): IRouterProviderProps {
  return useCoreRouterContext();
}

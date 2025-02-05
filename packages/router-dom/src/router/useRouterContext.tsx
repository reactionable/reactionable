import {
  IRouterProviderProps as ICoreRouterProviderProps,
  RouterContextProvider as CoreRouterContextProvider,
  useRouterContext as useCoreRouterContext,
} from "@reactionable/core";
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

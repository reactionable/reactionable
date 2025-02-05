import {
  IIdentityProviderProps,
  TestWrapper as CoreTestWrapper,
  ITestWrapperProps,
  IUIProviderProps,
} from "@reactionable/core";
import { ReactElement } from "react";

import { IRouterProviderProps, useRouterProviderProps } from "../router/useRouterProviderProps";
import { MemoryRouterComponent } from "../router/MemoryRouterComponent";

export function TestWrapper<
  IdentityProviderProps extends IIdentityProviderProps = IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps = IUIProviderProps,
  RouterProviderProps extends IRouterProviderProps = IRouterProviderProps,
>({
  router,
  ...props
}: ITestWrapperProps<IdentityProviderProps, UIProviderProps, RouterProviderProps>): ReactElement {
  const routerProps = useRouterProviderProps({
    ...router,
    Component: MemoryRouterComponent,
  }) as RouterProviderProps;
  return (
    <CoreTestWrapper<IdentityProviderProps, UIProviderProps, RouterProviderProps>
      {...props}
      router={routerProps}
    />
  );
}

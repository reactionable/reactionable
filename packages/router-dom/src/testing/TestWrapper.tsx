import { IIdentityProviderProps } from "@reactionable/core/lib/identity/Identity";
import {
  TestWrapper as CoreTestWrapper,
  ITestWrapperProps,
} from "@reactionable/core/lib/testing/TestWrapper";
import { IUIProviderProps } from "@reactionable/core/lib/ui/UI";
import { ReactElement } from "react";

import { IRouterProviderProps, useRouterProviderProps } from "../router/useRouterProviderProps";
import { MemoryRouterComponent } from "../router/MemoryRouterComponent";

export function TestWrapper<
  IdentityProviderProps extends IIdentityProviderProps = IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps = IUIProviderProps,
  RouterProviderProps extends IRouterProviderProps = IRouterProviderProps
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

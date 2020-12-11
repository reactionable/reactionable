import { App } from "@reactionable/core/lib/app/App";
import { IIdentityProviderProps } from "@reactionable/core/lib/identity/Identity";
import { ITestWrapperProps } from "@reactionable/core/lib/tests/TestWrapper";
import { IUIProviderProps } from "@reactionable/core/lib/ui/UI";
import { PropsWithChildren, ReactElement } from "react";

import { IRouterProviderProps, MemoryRouterComponent } from "../router/Router";

export function TestWrapper<
  IdentityProviderProps extends IIdentityProviderProps = IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps = IUIProviderProps,
  RouterProviderProps extends IRouterProviderProps = IRouterProviderProps
>({
  router,
  ...props
}: PropsWithChildren<
  ITestWrapperProps<IdentityProviderProps, UIProviderProps, RouterProviderProps>
>): ReactElement {
  router = { ...router, Component: MemoryRouterComponent } as RouterProviderProps;
  return (
    <App<IdentityProviderProps, UIProviderProps, RouterProviderProps> {...props} router={router} />
  );
}

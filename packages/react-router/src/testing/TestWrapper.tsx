import {
  IIdentityProviderProps,
  TestWrapper as CoreTestWrapper,
  ITestWrapperProps,
  IRouterProviderProps as ICoreRouterProviderProps,
  IUIProviderProps,
} from "@reactionable/core";
import { ReactElement } from "react";

import {
  IRouterProviderProps as IReactRouterProviderProps,
  useRouterProviderProps,
} from "../router/useRouterProviderProps";
import { MemoryRouterComponent } from "../router/MemoryRouterComponent";

export function TestWrapper<
  IdentityProviderProps extends IIdentityProviderProps = IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps = IUIProviderProps,
  RouterProviderProps extends ICoreRouterProviderProps = ICoreRouterProviderProps,
>({
  router,
  ...props
}: ITestWrapperProps<IdentityProviderProps, UIProviderProps, RouterProviderProps>): ReactElement {
  return (
    <CoreTestWrapper<IdentityProviderProps, UIProviderProps, RouterProviderProps>
      {...props}
      router={
        useRouterProviderProps({
          ...(router as Partial<IReactRouterProviderProps>),
          Component: MemoryRouterComponent,
        }) as unknown as RouterProviderProps
      }
    />
  );
}

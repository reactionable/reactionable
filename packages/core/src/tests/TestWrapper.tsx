import { PropsWithChildren, ReactElement } from "react";

import { App, IAppProps } from "../app/App";
import { IIdentityProviderProps } from "../identity/Identity";
import { IRouterProviderProps, useRouterProviderProps } from "../router/Router";
import { IUIProviderProps, useUIProviderProps } from "../ui/UI";

export type ITestWrapperProps<
  IdentityProviderProps extends IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps,
  RouterProviderProps extends IRouterProviderProps
> = IAppProps<IdentityProviderProps, UIProviderProps, RouterProviderProps>;

export function TestWrapper<
  IdentityProviderProps extends IIdentityProviderProps = IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps = IUIProviderProps,
  RouterProviderProps extends IRouterProviderProps = IRouterProviderProps
>(
  props: PropsWithChildren<
    ITestWrapperProps<IdentityProviderProps, UIProviderProps, RouterProviderProps>
  >
): ReactElement {
  return (
    <App<IdentityProviderProps, UIProviderProps, RouterProviderProps>
      router={useRouterProviderProps() as RouterProviderProps}
      ui={useUIProviderProps() as UIProviderProps}
      {...props}
    />
  );
}

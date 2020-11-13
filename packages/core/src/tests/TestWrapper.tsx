import React, { PropsWithChildren, ReactElement } from "react";

import { IWrapperProps, Wrapper } from "../app/Wrapper";
import { IIdentityProviderProps } from "../identity/Identity";
import { IRouterProviderProps, useRouterProviderProps } from "../router/Router";
import { IUIProviderProps, useUIProviderProps } from "../ui/UI";

export type ITestWrapperProps<
  IdentityProviderProps extends IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps,
  RouterProviderProps extends IRouterProviderProps
> = IWrapperProps<IdentityProviderProps, UIProviderProps, RouterProviderProps>;

export function TestWrapper<
  IdentityProviderProps extends IIdentityProviderProps = IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps = IUIProviderProps,
  RouterProviderProps extends IRouterProviderProps = IRouterProviderProps
>(
  props: PropsWithChildren<
    ITestWrapperProps<IdentityProviderProps, UIProviderProps, RouterProviderProps>
  >
): ReactElement {
  return <Wrapper router={useRouterProviderProps()} ui={useUIProviderProps()} {...props} />;
}

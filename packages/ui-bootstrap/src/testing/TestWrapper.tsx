import {
  IIdentityProviderProps,
  IRouterProviderProps,
  TestWrapper as CoreTestWrapper,
  ITestWrapperProps,
} from "@reactionable/core";
import { ReactElement } from "react";

import { IUIProviderProps, useUIProviderProps } from "../UI";

export function TestWrapper<
  IdentityProviderProps extends IIdentityProviderProps = IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps = IUIProviderProps,
  RouterProviderProps extends IRouterProviderProps = IRouterProviderProps,
>({
  ui,
  ...props
}: ITestWrapperProps<IdentityProviderProps, UIProviderProps, RouterProviderProps>): ReactElement {
  return <CoreTestWrapper ui={useUIProviderProps(ui)} {...props} />;
}

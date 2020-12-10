import { IIdentityProviderProps } from "@reactionable/core/lib/identity/Identity";
import { IRouterProviderProps } from "@reactionable/core/lib/router/Router";
import {
  TestWrapper as CoreTestWrapper,
  ITestWrapperProps,
} from "@reactionable/core/lib/tests/TestWrapper";
import { PropsWithChildren, ReactElement } from "react";

import { IUIProviderProps, useUIProviderProps } from "../UI";

export function TestWrapper<
  IdentityProviderProps extends IIdentityProviderProps = IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps = IUIProviderProps,
  RouterProviderProps extends IRouterProviderProps = IRouterProviderProps
>(
  props: PropsWithChildren<
    ITestWrapperProps<IdentityProviderProps, UIProviderProps, RouterProviderProps>
  >
): ReactElement {
  return <CoreTestWrapper ui={useUIProviderProps()} {...props} />;
}

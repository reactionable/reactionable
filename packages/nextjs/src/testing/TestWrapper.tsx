import { IAppProps } from "@reactionable/core/lib/app/App";
import { IIdentityProviderProps } from "@reactionable/core/lib/identity/Identity";
import { TestWrapper as CoreTestWrapper } from "@reactionable/core/lib/testing/TestWrapper";
import { IUIProviderProps } from "@reactionable/core/lib/ui/UI";
import { ReactElement } from "react";

import { IRouterProviderProps } from "../router/useRouterContext";
import { useRouterProviderProps } from "../router/useRouterProviderProps";

jest.mock("next/router", () => require("next-router-mock"));

export type ITestWrapperProps<
  IdentityProviderProps extends IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps,
  RouterProviderProps extends IRouterProviderProps,
> = IAppProps<IdentityProviderProps, UIProviderProps, RouterProviderProps>;

export function TestWrapper<
  IdentityProviderProps extends IIdentityProviderProps = IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps = IUIProviderProps,
  RouterProviderProps extends IRouterProviderProps = IRouterProviderProps,
>({
  router,
  ...props
}: ITestWrapperProps<IdentityProviderProps, UIProviderProps, RouterProviderProps>): ReactElement {
  router = useRouterProviderProps({ ...router }) as RouterProviderProps;
  return (
    <CoreTestWrapper<IdentityProviderProps, UIProviderProps, RouterProviderProps>
      {...props}
      router={router}
    />
  );
}

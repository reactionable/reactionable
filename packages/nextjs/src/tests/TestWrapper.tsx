import { IAppProps } from "@reactionable/core/lib/app/App";
import { IIdentityProviderProps } from "@reactionable/core/lib/identity/Identity";
import { TestWrapper as CoreTestWrapper } from "@reactionable/core/lib/tests/TestWrapper";
import { IUIProviderProps } from "@reactionable/core/lib/ui/UI";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import { createRouter } from "next/router";
import { PropsWithChildren, ReactElement } from "react";

import { IRouterProviderProps, useRouterProviderProps } from "../router/Router";

function RouterComponent({ children }: PropsWithChildren<unknown>): ReactElement {
  const router = createRouter("", {}, "", {
    initialProps: {},
    pageLoader: {
      getPageList: () => [],
    },
    App: () => null,
    Component: () => null,
    subscription: async () => undefined,
    wrapApp: () => null,
    isFallback: false,
  });
  return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
}

export type ITestWrapperProps<
  IdentityProviderProps extends IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps,
  RouterProviderProps extends IRouterProviderProps
> = IAppProps<IdentityProviderProps, UIProviderProps, RouterProviderProps>;

export function TestWrapper<
  IdentityProviderProps extends IIdentityProviderProps = IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps = IUIProviderProps,
  RouterProviderProps extends IRouterProviderProps = IRouterProviderProps
>({
  router,
  ...props
}: ITestWrapperProps<IdentityProviderProps, UIProviderProps, RouterProviderProps>): ReactElement {
  router = useRouterProviderProps({ ...router, Component: RouterComponent }) as RouterProviderProps;
  return (
    <CoreTestWrapper<IdentityProviderProps, UIProviderProps, RouterProviderProps>
      {...props}
      router={router}
    />
  );
}

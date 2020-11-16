import { Wrapper } from "@reactionable/core/lib/app/Wrapper";
import { IIdentityProviderProps } from "@reactionable/core/lib/identity/Identity";
import { ITestWrapperProps } from "@reactionable/core/lib/tests/TestWrapper";
import { IUIProviderProps } from "@reactionable/core/lib/ui/UI";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import { createRouter } from "next/router";
import React, { PropsWithChildren, ReactElement } from "react";

import { IRouterProviderProps } from "../router/Router";

function RouterComponent({ children }: PropsWithChildren<unknown>): ReactElement {
  const router = createRouter("", {}, "", {
    initialProps: {},
    pageLoader: {
      getPageList: jest.fn(),
    },
    App: jest.fn(),
    Component: jest.fn(),
    subscription: jest.fn().mockImplementation(() => Promise.resolve(undefined)),
    initialStyleSheets: [],
    wrapApp: jest.fn(),
    isFallback: false,
  });
  return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
}

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
  router = { ...router, Component: RouterComponent } as RouterProviderProps;
  return <Wrapper {...props} router={router} />;
}

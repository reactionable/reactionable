import { IAppProps } from "@reactionable/core/lib/app/App";
import { IIdentityProviderProps } from "@reactionable/core/lib/identity/Identity";
import { TestWrapper as CoreTestWrapper } from "@reactionable/core/lib/testing/TestWrapper";
import { IUIProviderProps } from "@reactionable/core/lib/ui/UI";
import { NEXT_DATA } from "next/dist/shared/lib/utils";
import { createRouter,  } from "next/router";
import {RouterContext} from 'next/dist/shared/lib/router-context';
import { PropsWithChildren, ReactElement } from "react";

import { IRouterProviderProps, useRouterProviderProps } from "../router/Router";

declare global {
  interface Window {
    /* prod */
    __NEXT_DATA__: NEXT_DATA;
  }
}

function RouterComponent({ children }: PropsWithChildren<unknown>): ReactElement {
  window.__NEXT_DATA__ = {
    props: {},
    page: "",
    query: {},
    buildId: ",",
  };
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

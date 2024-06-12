import { IAppProps } from "@reactionable/core/lib/app/App";
import { IIdentityProviderProps } from "@reactionable/core/lib/identity/Identity";
import { TestWrapper as CoreTestWrapper } from "@reactionable/core/lib/testing/TestWrapper";
import { IUIProviderProps } from "@reactionable/core/lib/ui/UI";
import { NEXT_DATA } from "next/dist/shared/lib/utils";
import { PropsWithChildren, ReactElement } from "react";

import { IRouterProviderProps } from "../router/useRouterContext";
import { useRouterProviderProps } from "../router/useRouterProviderProps";
import mockNextRouter from "./mockNextRouter";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";

declare global {
  interface Window {
    /* prod */
    __NEXT_DATA__: NEXT_DATA;
  }
}

function RouterComponent({
  children,
}: PropsWithChildren<Partial<IRouterProviderProps>>): ReactElement {
  window.__NEXT_DATA__ = {
    props: {},
    page: "",
    query: {},
    buildId: ",",
  };
  const router = mockNextRouter({ pathname: "/", asPath: "/" });
  return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
}

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
  router = useRouterProviderProps({ ...router, Component: RouterComponent }) as RouterProviderProps;
  return (
    <CoreTestWrapper<IdentityProviderProps, UIProviderProps, RouterProviderProps>
      {...props}
      router={router}
    />
  );
}

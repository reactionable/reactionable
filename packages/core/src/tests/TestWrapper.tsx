import React, { PropsWithChildren } from 'react';

import { IWrapperProps, Wrapper } from '../app/Wrapper';
import { IIdentityProviderProps } from '../identity/Identity';
import { IRouterProviderProps } from '../router/Router';
import { IUIContextProviderProps } from '../ui/UI';

export type ITestWrapperProps<
  IdentityProviderProps extends IIdentityProviderProps,
  UIProviderProps extends IUIContextProviderProps,
  RouterProviderProps extends IRouterProviderProps
> = IWrapperProps<IdentityProviderProps, UIProviderProps, RouterProviderProps>;

export function TestWrapper<
  IdentityProviderProps extends IIdentityProviderProps = IIdentityProviderProps,
  UIProviderProps extends IUIContextProviderProps = IUIContextProviderProps,
  RouterProviderProps extends IRouterProviderProps = IRouterProviderProps
>(
  props: PropsWithChildren<
    ITestWrapperProps<IdentityProviderProps, UIProviderProps, RouterProviderProps>
  >
) {
  return <Wrapper {...props} />;
}

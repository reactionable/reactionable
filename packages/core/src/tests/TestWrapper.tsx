import React, { PropsWithChildren } from 'react';

import { IWrapperProps, Wrapper } from '../app/Wrapper';
import { IIdentityContextProviderProps } from '../identity/Identity';
import { IRouterContextProviderProps } from '../router/Router';
import { IUIContextProviderProps } from '../ui/UI';

export type ITestWrapperProps<
  ICP extends IIdentityContextProviderProps,
  UICP extends IUIContextProviderProps,
  RCP extends IRouterContextProviderProps
> = IWrapperProps<ICP, UICP, RCP>;

export function TestWrapper<
  ICP extends IIdentityContextProviderProps = IIdentityContextProviderProps,
  UICP extends IUIContextProviderProps = IUIContextProviderProps,
  RCP extends IRouterContextProviderProps = IRouterContextProviderProps
>(props: PropsWithChildren<ITestWrapperProps<ICP, UICP, RCP>>) {
  return <Wrapper {...props} />;
}

import { IIdentityContextProviderProps } from '@reactionable/core/lib/identity/Identity';
import { IRouterProviderProps } from '@reactionable/core/lib/router/Router';
import {
  TestWrapper as CoreTestWrapper,
  ITestWrapperProps,
} from '@reactionable/core/lib/tests/TestWrapper';
import React, { PropsWithChildren } from 'react';

import { IUIContextProviderProps, useUIContextProviderProps } from '../UI';

export function TestWrapper<
  ICP extends IIdentityContextProviderProps = IIdentityContextProviderProps,
  UICP extends IUIContextProviderProps = IUIContextProviderProps,
  RCP extends IRouterProviderProps = IRouterProviderProps
>(props: PropsWithChildren<ITestWrapperProps<ICP, UICP, RCP>>) {
  return <CoreTestWrapper ui={useUIContextProviderProps()} {...props} />;
}

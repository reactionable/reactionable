import { IIdentityContextProviderProps } from '@reactionable/core/lib/identity/Identity';
import {
  TestWrapper as CoreTestWrapper,
  ITestWrapperProps as ICoreTestWrapperProps,
} from '@reactionable/core/lib/tests/TestWrapper';
import React, { PropsWithChildren } from 'react';

import { IUIContextProviderProps, useUIContextProviderProps } from '../UI';

export type ITestWrapperProps<
  ICP extends IIdentityContextProviderProps,
  UICP extends IUIContextProviderProps = IUIContextProviderProps
> = ICoreTestWrapperProps<ICP, UICP>;

export function TestWrapper<
  ICP extends IIdentityContextProviderProps = IIdentityContextProviderProps,
  UICP extends IUIContextProviderProps = IUIContextProviderProps
>(props: PropsWithChildren<ITestWrapperProps<ICP, UICP>>) {
  return <CoreTestWrapper ui={useUIContextProviderProps()} {...props} />;
}

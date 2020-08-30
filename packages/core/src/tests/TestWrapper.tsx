import React, { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router';

import { IWrapperProps, Wrapper } from '../app/Wrapper';
import { IIdentityContextProviderProps } from '../identity/Identity';
import { IUIContextProviderProps } from '../ui/UI';

export type ITestWrapperProps<
  ICP extends IIdentityContextProviderProps,
  UICP extends IUIContextProviderProps
> = Omit<IWrapperProps<ICP, UICP>, 'RouterComponent'>;

export function TestWrapper<
  ICP extends IIdentityContextProviderProps = IIdentityContextProviderProps,
  UICP extends IUIContextProviderProps = IUIContextProviderProps
>(props: PropsWithChildren<ITestWrapperProps<ICP, UICP>>) {
  return <Wrapper RouterComponent={MemoryRouter} {...props} />;
}

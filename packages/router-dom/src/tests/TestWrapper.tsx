import { MemoryRouter } from 'react-router';
import React, { PropsWithChildren } from 'react';
import { Wrapper } from '@reactionable/core/lib/app/Wrapper';
import { IIdentityContextProviderProps } from '@reactionable/core/lib/identity/Identity';
import { IUIContextProviderProps } from '@reactionable/core/lib/ui/UI';
import { IRouterContextProviderProps } from '../Router';
import { ITestWrapperProps } from '@reactionable/core/lib/tests/TestWrapper';

export function TestWrapper<
  ICP extends IIdentityContextProviderProps = IIdentityContextProviderProps,
  UICP extends IUIContextProviderProps = IUIContextProviderProps,
  RCP extends IRouterContextProviderProps = IRouterContextProviderProps
>({ router, ...props }: PropsWithChildren<ITestWrapperProps<ICP, UICP, RCP>>) {
  router = { ...router, Router: MemoryRouter } as RCP;
  return <Wrapper {...props} router={router} />;
}

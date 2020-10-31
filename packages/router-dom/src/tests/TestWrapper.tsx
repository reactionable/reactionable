import { Wrapper } from '@reactionable/core/lib/app/Wrapper';
import { IIdentityContextProviderProps } from '@reactionable/core/lib/identity/Identity';
import { ITestWrapperProps } from '@reactionable/core/lib/tests/TestWrapper';
import { IUIContextProviderProps } from '@reactionable/core/lib/ui/UI';
import React, { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router';

import { IRouterProviderProps } from '../Router';

export function TestWrapper<
  ICP extends IIdentityContextProviderProps = IIdentityContextProviderProps,
  UICP extends IUIContextProviderProps = IUIContextProviderProps,
  RCP extends IRouterProviderProps = IRouterProviderProps
>({ router, ...props }: PropsWithChildren<ITestWrapperProps<ICP, UICP, RCP>>) {
  router = { ...router, Router: MemoryRouter } as RCP;
  return <Wrapper {...props} router={router} />;
}

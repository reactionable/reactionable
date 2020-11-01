import { Wrapper } from '@reactionable/core/lib/app/Wrapper';
import { IIdentityProviderProps } from '@reactionable/core/lib/identity/Identity';
import { ITestWrapperProps } from '@reactionable/core/lib/tests/TestWrapper';
import { IUIContextProviderProps } from '@reactionable/core/lib/ui/UI';
import React, { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router';

import { IRouterProviderProps } from '../Router';

export function TestWrapper<
  IdentityProviderProps extends IIdentityProviderProps = IIdentityProviderProps,
  UIProviderProps extends IUIContextProviderProps = IUIContextProviderProps,
  RouterProviderProps extends IRouterProviderProps = IRouterProviderProps
>({
  router,
  ...props
}: PropsWithChildren<
  ITestWrapperProps<IdentityProviderProps, UIProviderProps, RouterProviderProps>
>) {
  router = { ...router, Router: MemoryRouter } as RouterProviderProps;
  return <Wrapper {...props} router={router} />;
}

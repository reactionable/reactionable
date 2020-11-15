import { IAppProps as ICoreAppProps } from '@reactionable/core/lib/app/App';
import { IIdentityProviderProps } from '@reactionable/core/lib/identity/Identity';
import { IRouterProviderProps } from '@reactionable/core/lib/router/Router';

import { IUseLayoutProps } from '../layout/Layout';
import { IUIProviderProps } from '../UI';

export type IAppProps<
  IdentityProviderProps extends IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps = IUIProviderProps,
  UseLayoutProps extends IUseLayoutProps = IUseLayoutProps,
  RouterProviderProps extends IRouterProviderProps = IRouterProviderProps
> = ICoreAppProps<
    IdentityProviderProps,
    UIProviderProps,
    UseLayoutProps,
    RouterProviderProps
  >

import { IAppProps as ICoreAppProps } from '@reactionable/core/lib/app/App';
import { IIdentityProviderProps } from '@reactionable/core/lib/identity/Identity';
import { IUseLayoutProps } from '@reactionable/core/lib/ui/layout/Layout';
import { IUIProviderProps } from '@reactionable/core/lib/ui/UI';

import { IRouterProviderProps } from '../Router';

export interface IAppProps<
  IdentityProviderProps extends IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps,
  UseLayoutProps extends IUseLayoutProps,
  RouterProviderProps extends IRouterProviderProps
> extends ICoreAppProps<
    IdentityProviderProps,
    UIProviderProps,
    UseLayoutProps,
    RouterProviderProps
  > {}

import { IAppProps as ICoreAppProps } from '@reactionable/core/lib/app/App';
import { IIdentityContextProviderProps } from '@reactionable/core/lib/identity/Identity';
import { IUseLayoutProps } from '@reactionable/core/lib/ui/layout/Layout';
import { IUIContextProviderProps } from '@reactionable/core/lib/ui/UI';

import { IRouterProviderProps } from '../Router';

export interface IAppProps<
  ICP extends IIdentityContextProviderProps,
  UICP extends IUIContextProviderProps,
  LP extends IUseLayoutProps,
  RCP extends IRouterProviderProps
> extends ICoreAppProps<ICP, UICP, LP, RCP> {}

import { IAppProps as ICoreAppProps } from '@reactionable/core/lib/app/App';
import { IIdentityContextProviderProps } from '@reactionable/core/lib/identity/Identity';

import { IUseLayoutProps } from '../layout/Layout';
import { IUIContextProviderProps } from '../UI';

export interface IAppProps<
  ICP extends IIdentityContextProviderProps,
  UICP extends IUIContextProviderProps = IUIContextProviderProps,
  LP extends IUseLayoutProps = IUseLayoutProps
> extends ICoreAppProps<ICP, UICP, LP> {}

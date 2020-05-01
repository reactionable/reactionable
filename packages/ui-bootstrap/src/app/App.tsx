import { IIdentityContextProviderProps, IAppProps as ICoreAppProps } from '@reactionable/core';
import { IUIContextProviderProps } from '../UI';
import { IUseLayoutProps } from '../layout/Layout';

export interface IAppProps<
  ICP extends IIdentityContextProviderProps,
  UICP extends IUIContextProviderProps = IUIContextProviderProps,
  LP extends IUseLayoutProps = IUseLayoutProps
> extends ICoreAppProps<ICP, UICP, LP> {}

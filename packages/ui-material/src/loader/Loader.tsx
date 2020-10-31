import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { ILoaderProps as ICoreLoaderProps } from '@reactionable/core/lib/ui/loader/Loader';
import {
  IUseLoaderProps as ICoreUseLoaderProps,
  IUseLoader,
  useLoader as useLoaderCore,
} from '@reactionable/core/lib/ui/loader/useLoader';
import React, { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';

export type ILoaderProps = ICoreLoaderProps & {
  overlay?: boolean;
};

export const Loader: ComponentType<ILoaderProps> = ({ overlay = true }) => {
  const { t } = useTranslation();
  const spinnerElement = <CircularProgress title={t('Loading')} />;
  if (!overlay) {
    return spinnerElement;
  }
  return (
    <div
      className="spinner--overlay"
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: '50%',
        left: '50%',
      }}
    >
      {spinnerElement}
    </div>
  );
};

export type IUseLoaderProps = ICoreUseLoaderProps & ILoaderProps;

export const useLoader: IUseLoader<IUseLoaderProps> = (props = {}) => {
  return useLoaderCore({ ...props, Component: Loader });
};

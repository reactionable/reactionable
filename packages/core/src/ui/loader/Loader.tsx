import React, { FC, LazyExoticComponent } from 'react';
import { useTranslation } from 'react-i18next';

import { withSuspense } from '../suspense/Suspense';

export type ILoaderProps = {};
export type LoaderComponent = FC<ILoaderProps>;

export const Loader: LoaderComponent = () => {
  const { t } = useTranslation();
  return t('Loading');
};

export const lazyLoad = (ComponentToLoad: LazyExoticComponent<any>): FC => (props: any) =>
  withSuspense(<ComponentToLoad {...props} />);

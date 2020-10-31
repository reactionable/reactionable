import React, { ComponentType, LazyExoticComponent, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import { withSuspense } from '../suspense/Suspense';

export type ILoaderProps = {};
export type LoaderComponent = ComponentType<ILoaderProps>;

export const Loader: LoaderComponent = () => {
  const { t } = useTranslation();
  return t('Loading');
};

export const lazyLoad = (ComponentToLoad: LazyExoticComponent<any>) => (
  props: PropsWithChildren<any>
) => withSuspense(<ComponentToLoad {...props} />);

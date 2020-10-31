import React, { ComponentType, ReactNode, Suspense as ReactSuspence, SuspenseProps } from 'react';

import { useUIContext } from '../UI';

export type ISuspenseProps = Pick<SuspenseProps, 'children'> &
  Partial<Omit<SuspenseProps, 'children'>>;

export const Suspense: ComponentType<ISuspenseProps> = (props) => {
  let fallback: ISuspenseProps['fallback'];
  if (props.fallback !== undefined) {
    fallback = props.fallback;
  } else {
    const { loader } = useUIContext().useLoader({ isLoading: true });
    fallback = loader;
  }

  return <ReactSuspence fallback={fallback || null} {...props} />;
};

export const withSuspense = (component: ReactNode) => {
  return <Suspense>{component}</Suspense>;
};

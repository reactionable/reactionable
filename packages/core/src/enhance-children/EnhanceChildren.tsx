import React, { Children, PropsWithChildren, cloneElement } from 'react';

export type IEnhanceChildrenProps = { enhance: { [key: string]: any } };
export const EnhanceChildren = (props: PropsWithChildren<IEnhanceChildrenProps>) => {
  const { children, enhance } = props;

  const newChildren = Children.map(children, (child, i) => {
    if (typeof child === 'object' && child !== null && 'type' in child) {
      return cloneElement(child, { ...enhance });
    }
    return child;
  });

  return <>{newChildren}</>;
};

import React, { FC, Children, cloneElement } from 'react';

export const EnhanceChildren: FC<{ enhance: { [key: string]: any } }> = (props) => {
  const { children, enhance } = props;

  const newChildren = Children.map(children, (child, i) => {
    if (typeof child === 'object' && child !== null && 'type' in child) {
      return cloneElement(child, { ...enhance });
    }
    return child;
  });

  return <>{newChildren}</>;
};

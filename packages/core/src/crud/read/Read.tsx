import React, { ComponentType, ReactNode } from 'react';

import { IUseQueryResult } from '../../query/Query';
import {
  IQueryWrapperChildrenProps,
  IQueryWrapperProps,
  QueryWrapper,
} from '../../query/QueryWrapper';

export type IReadProps<Data> = Omit<IQueryWrapperProps<IUseQueryResult<Data>>, 'children'> & {
  children: (data: Data) => ReactNode;
};

export type ReadComponent<Data> = ComponentType<IReadProps<Data>>;

export function Read<Data>({ children, ...props }: IReadProps<Data>) {
  const renderChildren = (props: IQueryWrapperChildrenProps<IUseQueryResult<Data>>) => {
    return children(props.data);
  };
  return <QueryWrapper<Data> {...props} children={renderChildren} />;
}

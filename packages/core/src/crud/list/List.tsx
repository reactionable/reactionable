import React, { ComponentType, ReactElement, ReactNode } from "react";

import { IUseQueryListResult } from "../../query/QueryList";
import { IQueryWrapperProps, QueryWrapper } from "../../query/QueryWrapper";

export type IListProps<Data> = Omit<IQueryWrapperProps<IUseQueryListResult<Data>>, "children"> & {
  children: (data: Array<Data>) => ReactNode;
};

export type ListComponent<Data> = ComponentType<IListProps<Data>>;

export function List<Data>({ children, ...props }: IListProps<Data>): ReactElement {
  const renderChildren = (props: IUseQueryListResult<Data>) => {
    return children(props.data);
  };

  return (
    <QueryWrapper<Array<Data>, IUseQueryListResult<Data>> {...props}>{renderChildren}</QueryWrapper>
  );
}

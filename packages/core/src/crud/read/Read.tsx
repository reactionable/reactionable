import React, { ComponentType, ReactElement, ReactNode } from "react";

import { IData, IUseQueryResult } from "../../query/Query";
import {
  IQueryWrapperChildrenProps,
  IQueryWrapperProps,
  QueryWrapper,
} from "../../query/QueryWrapper";

export type IReadProps<Data extends IData = IData> = Omit<
  IQueryWrapperProps<IUseQueryResult<Data>>,
  "children"
> & {
  children: (data: Data) => ReactNode;
};

export type ReadComponent<Data extends IData = IData> = ComponentType<IReadProps<Data>>;

export function Read<Data extends IData = IData>({
  children,
  ...props
}: IReadProps<Data>): ReactElement {
  const renderChildren = (props: IQueryWrapperChildrenProps<IUseQueryResult<Data>>) => {
    return children(props.data);
  };
  return <QueryWrapper<Data> {...props}>{renderChildren}</QueryWrapper>;
}

import React, { ComponentType, ReactElement } from "react";

import { IData } from "../../query/Query";
import { IListData } from "../../query/QueryList";
import { IQueryWrapperProps, QueryWrapper } from "../../query/QueryWrapper";
import { IUseListResult } from "./useList";

export type IListProps<Data extends IData = IData> = IUseListResult<Data> & {
  children: IQueryWrapperProps<IListData<Data>>["children"];
  noData?: IQueryWrapperProps<IListData<Data>>["noData"];
};

export type ListComponent<Data extends IData = IData> = ComponentType<IListProps<Data>>;

export function List<Data extends IData = IData>(props: IListProps<Data>): ReactElement {
  return <QueryWrapper<IListData<Data>> {...props} />;
}

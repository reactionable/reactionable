import React, { ComponentType, PropsWithChildren, ReactElement } from "react";

import { IData } from "../../query/Query";
import { IQueryWrapperProps, QueryWrapper } from "../../query/QueryWrapper";
import { IUseReadResult } from "./useRead";

export type IReadProps<Data extends IData = IData> = IUseReadResult<Data> & {
  children: IQueryWrapperProps<Data>["children"];
  noData?: IQueryWrapperProps<Data>["noData"];
};

export type ReadComponent<Data extends IData = IData> = ComponentType<IReadProps<Data>>;

export function Read<Data extends IData = IData>(
  props: PropsWithChildren<IReadProps<Data>>
): ReactElement {
  return <QueryWrapper<Data> {...props} />;
}

import type { ComponentType, ReactElement } from "react";

import type { IData } from "../../query/Query";
import type { IListData } from "../../query/QueryList";
import {
	type IQueryWrapperProps,
	QueryWrapper,
} from "../../query/QueryWrapper";
import type { IUseListResult } from "./useList";

export type IListProps<Data extends IData = IData> = IUseListResult<Data> & {
	children: IQueryWrapperProps<IListData<Data>>["children"];
	noData?: IQueryWrapperProps<IListData<Data>>["noData"];
};

export type ListComponent<Data extends IData = IData> = ComponentType<
	IListProps<Data>
>;

export function List<Data extends IData = IData>(
	props: IListProps<Data>,
): ReactElement {
	return <QueryWrapper<IListData<Data>> {...props} />;
}

import type { ComponentType, ReactElement } from "react";

import type { IData } from "../../query/Query";
import {
	type IQueryWrapperProps,
	QueryWrapper,
} from "../../query/QueryWrapper";
import type { IUseReadResult } from "./useRead";

export type IReadProps<Data extends IData = IData> = IUseReadResult<Data> & {
	children: IQueryWrapperProps<Data>["children"];
	noData?: IQueryWrapperProps<Data>["noData"];
};

export type ReadComponent<Data extends IData = IData> = ComponentType<
	IReadProps<Data>
>;

export function Read<Data extends IData = IData>(
	props: IReadProps<Data>,
): ReactElement {
	return <QueryWrapper<Data> {...props} />;
}

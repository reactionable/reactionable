import type { IData, IVariables } from "../../query/Query";
import {
	type IUseQueryListOptions,
	type IUseQueryListResult,
	useQueryList,
} from "../../query/QueryList";

export type IUseListOptions<
	Data extends IData = IData,
	Variables extends IVariables = IVariables,
> = IUseQueryListOptions<Data, Variables>;

export type IUseListResult<Data extends IData = IData> =
	IUseQueryListResult<Data>;

export function useList<
	Data extends IData = IData,
	Variables extends IVariables = IVariables,
>(options: IUseListOptions<Data, Variables>): IUseListResult<Data> {
	return useQueryList<Data, Variables>(options);
}

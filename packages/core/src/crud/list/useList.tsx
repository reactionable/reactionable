import { IData, IVariables } from "../../query/Query";
import { IUseQueryListOptions, IUseQueryListResult, useQueryList } from "../../query/QueryList";

export type IUseListOptions<
  Data extends IData = IData,
  Variables extends IVariables = IVariables
> = IUseQueryListOptions<Data, Variables>;

export type IUseListResult<Data extends IData = IData> = IUseQueryListResult<Data>;

export type IUseListQuery<Data extends IData = IData, Variables extends IVariables = IVariables> = (
  options: IUseListOptions<Data, Variables>
) => IUseListResult<Data>;

export function useList<Data extends IData = IData, Variables extends IVariables = IVariables>(
  options: IUseListOptions<Data, Variables>
): IUseListResult<Data> {
  return useQueryList<Data, Variables>(options);
}

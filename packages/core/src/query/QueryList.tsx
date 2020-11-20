import {
  IData,
  IQueryOptions,
  IUseQueryOptions,
  IUseQueryResult,
  IVariables,
  useQuery,
} from "./Query";

export type IListData<Data extends IData = IData> = {
  items: Data[];
  count: number;
};

export type IListVariables<Variables extends IVariables> = Variables & {
  offset?: number;
  limit?: number;
};

export type IQueryListOptions<Variables extends IVariables = IVariables> = IQueryOptions<
  IListVariables<Variables>
>;

export type IUseQueryListOptions<
  Data extends IData,
  Variables extends IVariables
> = IUseQueryOptions<IListData<Data>, IListVariables<Variables>>;

export type IUseQueryListResult<Data extends IData = IData> = IUseQueryResult<IListData<Data>>;

export function useQueryList<Data extends IData = IData, Variables extends IVariables = IVariables>(
  options: IUseQueryListOptions<Data, Variables>
): IUseQueryListResult<Data> {
  return useQuery<IListData<Data>, IListVariables<Variables>>(options);
}

import { IData, IUseQueryOptions, IUseQueryResult, IVariables, useQuery } from "../../query/Query";

export type IUseReadOptions<
  Data extends IData = IData,
  Variables extends IVariables = IVariables
> = IUseQueryOptions<Data, Variables>;

export type IUseReadResult<Data extends IData = IData> = IUseQueryResult<Data>;

export function useRead<Data extends IData = IData, Variables extends IVariables = IVariables>(
  options: IUseReadOptions<Data, Variables>
): IUseReadResult<Data> {
  return useQuery<Data, Variables>(options);
}

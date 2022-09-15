import {
  IUseQueryResult as ICoreUseQueryResult,
  useQuery as useQueryCore,
} from "@reactionable/core";

import { IData, IQueryOptions, IVariables, query as amplifyQuery } from "./Query";

export type IUseQueryOptions<TVariables extends IVariables = IVariables> = Omit<
  IQueryOptions<TVariables>,
  "query"
>;

export type IUseQueryResult<TData extends IData = IData> = ICoreUseQueryResult<TData>;

export function useQuery<TData extends IData = IData, TVariables extends IVariables = IVariables>(
  query: string,
  options?: IUseQueryOptions<TVariables>
): IUseQueryResult<TData> {
  return useQueryCore<TData, TVariables>({
    ...options,
    handleQuery: (queryOptions) => amplifyQuery({ query, ...queryOptions }),
  });
}

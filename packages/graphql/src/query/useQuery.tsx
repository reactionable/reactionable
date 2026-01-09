import { useQuery as useQueryHook } from "@apollo/client/react";
import type { QueryHookOptions, QueryResult } from "@apollo/client/react";
import type { QueryOptions } from "@apollo/client/core";

import { IData, IVariables, extractGqlData, stringToGQL } from "../Client";

export type IQueryOptions<TVariables extends IVariables = IVariables, TData = IData> = Omit<
  QueryOptions<TVariables, TData>,
  "query"
>;

export type IQueryHookOptions<TData = IData, TVariables extends IVariables = IVariables> = Omit<
  QueryHookOptions<TData, TVariables>,
  "query"
>;

export type IUseQueryResult<
  TData = IData,
  TVariables extends IVariables = IVariables,
> = Omit<QueryResult<TData, TVariables>, "data"> & {
  data: TData | undefined;
};

export function useQuery<TData = IData, TVariables extends IVariables = IVariables>(
  query: string,
  options?: IQueryHookOptions<TData, TVariables>
): IUseQueryResult<TData, TVariables> {
  const gqlQuery = stringToGQL(query);
  const useQueryFn = useQueryHook as unknown as (
    query: unknown,
    options?: IQueryHookOptions<TData, TVariables>
  ) => QueryResult<TData, TVariables>;
  const { data, error, ...result } = useQueryFn(gqlQuery, options);

  return {
    data: !result.loading && !error ? extractGqlData<TData>(data) : undefined,
    error: error ? error : undefined,
    ...result,
  };
}

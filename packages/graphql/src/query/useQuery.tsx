import {
  QueryHookOptions,
  QueryOptions,
  QueryResult,
  useQuery as useQueryHook,
} from "@apollo/client";

import { IData, IVariables, extractGqlData, stringToGQL } from "../Client";

export type IQueryOptions<TVariables = IVariables, TData = IData> = Omit<
  QueryOptions<TVariables, TData>,
  "query"
>;

export type IQueryHookOptions<TData = IData, TVariables = IVariables> = Omit<
  QueryHookOptions<TData, TVariables>,
  "query"
>;

export type IUseQueryResult<TData = IData, TVariables = IVariables> = QueryResult<
  TData,
  TVariables
> & {
  data: TData | undefined;
};

export function useQuery<TData = IData, TVariables = IVariables>(
  query: string,
  options?: IQueryHookOptions<TData, TVariables>
): IUseQueryResult<TData, TVariables> {
  const gqlQuery = stringToGQL(query);
  const { data, error, ...result } = useQueryHook<TData, TVariables>(gqlQuery, options);

  return {
    data: !result.loading && !error ? extractGqlData<TData>(data) : undefined,
    error: error ? error : undefined,
    ...result,
  };
}

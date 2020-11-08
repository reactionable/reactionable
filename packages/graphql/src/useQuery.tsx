import {
  OperationVariables,
  QueryHookOptions,
  QueryOptions,
  useQuery as useQueryHook,
} from '@apollo/client';

import { IOperationVariables, extractGqlData, stringToGQL } from './Client';

export type IQueryOptions<TVariables = IOperationVariables, TData = any> = Omit<
  QueryOptions<TVariables, TData>,
  'query'
>;

export type IQueryHookOptions<TData = any, TVariables = OperationVariables> = Omit<
  QueryHookOptions<TData, TVariables>,
  'query'
>;

export function useQuery<TData = any, TVariables = IOperationVariables>(
  query: string,
  options?: IQueryHookOptions<TData, TVariables>
) {
  const gqlQuery = stringToGQL(query);
  const { data, error, ...result } = useQueryHook<TData, TVariables>(gqlQuery, options);

  return {
    data: !result.loading && !error ? extractGqlData<TData>(data) : undefined,
    error: error ? error : undefined,
    ...result,
  };
}

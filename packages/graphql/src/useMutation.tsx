import {
  MutationFunctionOptions,
  MutationHookOptions,
  MutationOptions,
  useMutation as useMutationHook,
} from '@apollo/client';

import { IOperationVariables, extractGqlData, stringToGQL } from './Client';

export type IMutationOptions<T = any, TVariables = IOperationVariables> = Omit<
  MutationOptions<T, TVariables>,
  'mutation'
>;

export type IMutationFunctionOptions<
  TData = any,
  TVariables = IOperationVariables
> = MutationFunctionOptions<TData, TVariables>;

export type IMutationHookOptions<
  TData = any,
  TVariables = IOperationVariables
> = MutationHookOptions<TData, TVariables>;

export function useMutation<TData = any, TVariables = IOperationVariables>(
  mutation: string,
  options?: IMutationHookOptions<TData, TVariables>
) {
  const gqlQuery = stringToGQL(mutation);
  const [mutate, { error, data, ...result }] = useMutationHook<TData, TVariables>(
    gqlQuery,
    options
  );

  return {
    mutate: async (options?: IMutationFunctionOptions<TData, TVariables>) => {
      const { data, ...result } = await mutate(options);
      return {
        ...result,
        data: extractGqlData<TData>(data),
      };
    },
    data: result.called && !result.loading && !error ? extractGqlData<TData>(data) : undefined,
    error: error ? error : undefined,
    ...result,
  };
}

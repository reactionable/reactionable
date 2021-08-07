import {
  FetchResult,
  MutationFunctionOptions,
  MutationHookOptions,
  MutationOptions,
  MutationResult,
  useMutation as useMutationHook,
} from "@apollo/client";

import { IData, IVariables, extractGqlData, stringToGQL } from "../Client";

export type IMutationOptions<TData = IData, TVariables = IVariables> = Omit<
  MutationOptions<TData, TVariables>,
  "mutation"
>;

export type IMutationFunctionOptions<
  TData = IData,
  TVariables = IVariables
> = MutationFunctionOptions<TData, TVariables>;

export type IMutationHookOptions<TData = IData, TVariables = IVariables> = MutationHookOptions<
  TData,
  TVariables
>;

export type IUseMutationResult<TData = IData, TVariables = IVariables> = MutationResult<TData> & {
  data: TData | undefined;
  mutate: (
    options?: IMutationFunctionOptions<TData, TVariables>
  ) => Promise<
    FetchResult<TData> & {
      data: TData | undefined;
    }
  >;
};

export function useMutation<TData = IData, TVariables = IVariables>(
  mutation: string,
  options?: IMutationHookOptions<TData, TVariables>
): IUseMutationResult<TData, TVariables> {
  const gqlQuery = stringToGQL(mutation);

  const update = options?.update;

  const [mutate, { error, data, ...result }] = useMutationHook<TData, TVariables>(gqlQuery, {
    ...options,
    ...(update
      ? {
          update: (cache, { data, ...mutationResult }, ...othersArguments) =>
            update(
              cache,
              { data: extractGqlData<TData>(data) as TData, ...mutationResult },
              ...othersArguments
            ),
        }
      : undefined),
  });

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

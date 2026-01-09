import { useMutation as useMutationHook } from "@apollo/client/react";
import type {
  MutationFunctionOptions,
  MutationHookOptions,
  MutationResult,
} from "@apollo/client/react";
import type { MutationOptions } from "@apollo/client/core";
import type { FetchResult } from "@apollo/client/core";

import { IData, IVariables, extractGqlData, stringToGQL } from "../Client";
import type { Unmasked } from "@apollo/client/masking";

export type IMutationOptions<TData = IData, TVariables extends IVariables = IVariables> = Omit<
  MutationOptions<TData, TVariables>,
  "mutation"
>;

export type IMutationFunctionOptions<
  TData = IData,
  TVariables extends IVariables = IVariables,
> = MutationFunctionOptions<TData, TVariables>;

export type IMutationHookOptions<
  TData extends IData = IData,
  TVariables extends IVariables = IVariables,
> = MutationHookOptions<TData, TVariables>;

export type IUseMutationResult<TData = IData, TVariables extends IVariables = IVariables> = Omit<
  MutationResult<TData>,
  "data"
> & {
  data: TData | undefined;
  mutate: (options?: IMutationFunctionOptions<TData, TVariables>) => Promise<
    FetchResult<TData> & {
      data: TData | undefined;
    }
  >;
};

export function useMutation<
  TData extends IData = IData,
  TVariables extends IVariables = IVariables,
>(
  mutation: string,
  options?: IMutationHookOptions<TData, TVariables>
): IUseMutationResult<TData, TVariables> {
  const gqlQuery = stringToGQL(mutation);

  const update = options?.update;

  type UpdateFunction = NonNullable<IMutationHookOptions<TData, TVariables>["update"]>;

  const [mutate, { error, data, ...result }] = useMutationHook<TData, TVariables>(gqlQuery, {
    ...options,
    ...(update
      ? {
          update: ((cache: unknown, mutationResult: unknown, ...othersArguments: unknown[]) => {
            const mutationResultRecord = mutationResult as { data?: unknown } & Record<string, unknown>;
            const updateData = extractGqlData<TData>(mutationResultRecord.data as IData) as Unmasked<TData>;
            const nextResult = { ...mutationResultRecord, data: updateData };
            if (othersArguments.length) {
              return (update as unknown as (cache: unknown, result: unknown, options: unknown) => unknown)(
                cache,
                nextResult,
                othersArguments[0]
              ) as never;
            }

            return (update as unknown as (cache: unknown, result: unknown) => unknown)(
              cache,
              nextResult
            ) as never;
          }) as UpdateFunction,
        }
      : undefined),
  });

  return {
    mutate: async (options?: IMutationFunctionOptions<TData, TVariables>) => {
      const mutateFn = mutate as unknown as (
        options?: IMutationFunctionOptions<TData, TVariables>
      ) => Promise<FetchResult<TData>>;
      const { data, ...result } = await mutateFn(options);
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

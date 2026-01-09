import { IData, IVariables } from "../Client";
import { IMutationHookOptions, IUseMutationResult, useMutation } from "./useMutation";
import type { ApolloCache } from "@apollo/client/cache";

export function useMutationDelete<
  TData extends IData = IData,
  TVariables extends IVariables = IVariables,
>(
  mutation: string,
  options?: IMutationHookOptions<TData, TVariables>
): IUseMutationResult<TData, TVariables> {
  return useMutation<TData, TVariables>(mutation, {
    update: (cache: ApolloCache, mutationResult: { data?: unknown }) => {
      const { data } = mutationResult;
      if (isEntityData(data)) {
        cache.evict({
          id: cache.identify({
            __typename: data["__typename"],
            id: data["id"],
          }),
        });
      }
    },
    ...options,
  });
}

function isEntityData(data: unknown): data is { __typename: string; id: string } {
  return data !== null && typeof data === "object" && "__typename" in data && "id" in data;
}

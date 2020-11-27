import { IData, IVariables } from "../Client";
import { IMutationHookOptions, IUseMutationResult, useMutation } from "./useMutation";

export function useMutationDelete<TData = IData, TVariables = IVariables>(
  mutation: string,
  options?: IMutationHookOptions<TData, TVariables>
): IUseMutationResult<TData, TVariables> {
  return useMutation<TData, TVariables>(mutation, {
    update: (cache, { data }) => {
      if (data && data["__typename"] && data["id"]) {
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

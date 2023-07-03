import { IData, IVariables } from "../Client";
import { IMutationHookOptions, IUseMutationResult, useMutation } from "./useMutation";

export function useMutationDelete<TData = IData, TVariables = IVariables>(
  mutation: string,
  options?: IMutationHookOptions<TData, TVariables>
): IUseMutationResult<TData, TVariables> {
  return useMutation<TData, TVariables>(mutation, {
    update: (cache, { data }) => {
      if (isDataEntity(data)) {
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

type IDataEntity = IData & { __typename: string; id: string };
export function isDataEntity(arg: unknown): arg is IDataEntity {
  return !!(
    arg &&
    typeof arg === "object" &&
    Object.prototype.hasOwnProperty.call(arg, "__typename") &&
    (arg as Record<string, unknown>)["__typename"] &&
    Object.prototype.hasOwnProperty.call(arg, "id") &&
    (arg as Record<string, unknown>)["id"]
  );
}

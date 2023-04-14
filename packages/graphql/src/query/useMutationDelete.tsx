import { IData, IVariables } from "../Client";
import { IMutationHookOptions, IUseMutationResult, useMutation } from "./useMutation";

type IIdentifiableData<TData = IData> = TData & {
  __typename: string;
  id: string;
};

function isIdentifiableData<TData = IData>(data: unknown): data is IIdentifiableData<TData> {
  return !!data && typeof data === "object" && "__typename" in data && "id" in data;
}

export function useMutationDelete<TData = IData, TVariables = IVariables>(
  mutation: string,
  options?: IMutationHookOptions<TData, TVariables>
): IUseMutationResult<TData, TVariables> {
  return useMutation<TData, TVariables>(mutation, {
    update: (cache, { data }) => {
      if (!isIdentifiableData(data)) {
        return;
      }

      cache.evict({
        id: cache.identify({
          __typename: data["__typename"],
          id: data["id"],
        }),
      });
    },
    ...options,
  });
}

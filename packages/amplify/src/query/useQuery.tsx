import {
  IUseQueryOptions as ICoreUseQueryOptions,
  IUseQueryResult,
  useQuery as coreUseQuery,
} from "@reactionable/core";

import { IData, IQueryOptions, IVariables, query } from "./Query";

export type IUseQueryOptions<Data extends IData, Variables extends IVariables> = Omit<
  ICoreUseQueryOptions<Data, IQueryOptions<Variables>>,
  "handleQuery"
>;

export function useQuery<Data extends IData, Variables extends IVariables>(
  options: IUseQueryOptions<Data, Variables>
): IUseQueryResult<Data> {
  return coreUseQuery<Data, IQueryOptions<Variables>>({
    ...options,
    handleQuery: (queryOptions: IQueryOptions<Variables>) =>
      query<Data, IQueryOptions<Variables>>(queryOptions),
  });
}

import { IData, IQueryOptions, IVariables, query } from "./Query";

export function mutation<Data extends IData, Variables extends IVariables>(
  options: IQueryOptions<Variables>
): Promise<Data> {
  return query<Data, IQueryOptions<Variables>>(options);
}

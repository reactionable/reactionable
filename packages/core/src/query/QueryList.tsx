import { IData, IUseQueryOptions, IUseQueryResult, IVariables } from "./Query";

export type IUseQueryListOptions<Variables extends IVariables = IVariables> = IUseQueryOptions<
  Variables
> & {
  queryAll?: boolean;
};

export interface IUseQueryListResult<Data extends IData = IData>
  extends Omit<IUseQueryResult<Data>, "data"> {
  data: Array<Data>;
  next?: () => void;
  previous?: () => void;
}

export type IUseQueryList<
  Data extends IData = IData,
  Options extends IUseQueryListOptions = IUseQueryListOptions
> = (options?: Options) => IUseQueryListResult<Data>;

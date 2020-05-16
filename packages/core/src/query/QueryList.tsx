import { IUseQueryResult, IUseQueryOptions } from './Query';

export type IUseQueryListOptions<Variables extends {} = {}> = IUseQueryOptions<Variables> & {
  queryAll?: boolean;
};

export interface IUseQueryListResult<Data> extends Omit<IUseQueryResult<Data>, 'data'> {
  data: Array<Data>;
  next?: () => void;
  previous?: () => void;
}

export type IUseQueryList<
  Data extends {},
  Options extends IUseQueryListOptions = IUseQueryListOptions
> = (options?: Options) => IUseQueryListResult<Data>;

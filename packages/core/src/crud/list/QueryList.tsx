import { IUseQueryResult, IUseQueryOptions } from '../Query';

export interface IUseQueryListResult<Data> extends Omit<IUseQueryResult<Data>, 'data'> {
    data: Array<Data>;
    next: () => void;
    previous: () => void;
};

export type IUseQueryList<Data extends {}, Options extends IUseQueryOptions = {}> = (
    options?: Options
) => IUseQueryListResult<Data>;
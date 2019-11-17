import { IError } from '../error/IError';

export interface IUseQueryResult<Data> {
    isLoading: boolean;
    error?: IError;
    data?: Data;
    refetch: () => void;
};

export interface IUseQueryOptions<Variables extends {} = {}> {
    variables?: Variables;
};

export type IUseQuery<Data extends {}, Options extends IUseQueryOptions = {}> = (
    options?: Options
) => IUseQueryResult<Data>;
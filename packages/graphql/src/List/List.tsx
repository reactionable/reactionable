import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import { gql } from 'apollo-boost';
import { IListProps } from '@reactionable/core';

export type IUseListCallback<Data = any> =
    Pick<IListProps<Data>, 'isLoading' | 'error' | 'data'>
    & Pick<QueryResult<Data>, 'refetch' | 'fetchMore'>;

export const useListCallback = (query: string, variables?: Object): IUseListCallback => {
    const { loading, error, data, refetch, fetchMore } = useQuery(
        gql`${query}`,
        { variables }
    );

    return {
        isLoading: !!loading,
        error: error ? error : undefined,
        data: !loading && !error ? extractGqlData(data) : data,
        refetch,
        fetchMore,
    };
};

const extractGqlData: <Data = any, Result = any>(data?: Data) => Array<Result> = (data) => {
    if (!data) {
        throw new Error('No data');
    }

    let dataResult: any = data;
    while (dataResult.data === undefined) {
        dataResult = dataResult[Object.keys(dataResult)[0]];
        if (!dataResult) {
            throw new Error('No data found in result');
        }
    }
    return dataResult && dataResult.data ? dataResult.data : [];
};
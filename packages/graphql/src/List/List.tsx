import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

export const useListCallback = async (query: string, variables?: Object) => {
    const { loading, error, data, refetch } = useQuery(
        gql`${query}`,
        { variables }
    );

    return {
        isLoading: !!loading,
        error,
        data: !loading && !error ? extractGqlData(data) : data,
        refetch,
    };
};

export const extractGqlData: <Data = any, Result = any>(data?: Data) => Array<Result> = (data) => {
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
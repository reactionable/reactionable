import { useState, useRef, useEffect } from 'react';
import deepEqual from 'dequal';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api/lib-esm/types';
import { IError, IUseQueryOptions as ICoreUseQueryOptions, IUseQueryResult } from '@reactionable/core';

function isGraphQLResult(arg: any): arg is GraphQLResult {
    return arg.data !== undefined;
}

function extractGqlData<Data>(result: GraphQLResult): Data | undefined {
    const data = result[Object.keys(result)[0]];
    return data as Data | undefined;
};

function useDeepCompareMemoize(value: any) {
    const ref = useRef()

    if (!deepEqual(value, ref.current)) {
        ref.current = value
    }

    return ref.current
}

export function useDeepCompareEffect(callback: any, dependencies: any) {
    useEffect(callback, useDeepCompareMemoize(dependencies))
}

type IApiGraphqlOptions<Variables> = {
    query: string;
    variables?: Variables;
    rawData?: boolean;
};

export async function apiGraphql<Data, Variables>({ query, variables, rawData }: IApiGraphqlOptions<Variables>): Promise<Data>{
    const result = (await API.graphql(graphqlOperation(query, variables)));

    if (!isGraphQLResult(result) || !result.data) {
        throw new Error('No data');
    }

    if(rawData){
        return result.data as unknown as Data;
    }

    const data = extractGqlData<Data>(result.data);
    if (!data) {
        throw new Error('No data');
    }

    return data;
};

export const mutation = async <Data extends {}, Variables extends {}>(options: IApiGraphqlOptions<Variables>) => apiGraphql<Data, Variables>(options);

export type IUseQueryOptions<Variables> = ICoreUseQueryOptions<Variables> & IApiGraphqlOptions<Variables>;

export const useQuery = <Data extends {}, Variables extends {}>({ query, variables }: IUseQueryOptions<Variables>): IUseQueryResult<Data> => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<IError | undefined>(undefined);
    const [data, setData] = useState<Data | undefined>(undefined);

    const fetchQuery = async (query: string, variables?: Variables) => {
        try {
            setLoading(true);
            const data = await apiGraphql<Data, Variables>({ query, variables });
            setData(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const refetch = () => {
        fetchQuery(query, variables);
    };

    useDeepCompareEffect(() => {
        fetchQuery(query, variables);
    }, [query, variables]);

    return {
        isLoading,
        data,
        error,
        refetch,
    };
};
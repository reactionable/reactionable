import { useState, useEffect } from 'react';
import { IUseQueryListResult } from '@reactionable/core';
import { GraphQLResult } from '@aws-amplify/api/lib-esm/types';
import { useQuery, IUseQueryOptions, useDeepCompareEffect } from './Query';

export type UndefinedGQLType<T> = T | null | undefined;
export type AmplifyListType<Data> = {
    items: Data[] | null;
    nextToken: UndefinedGQLType<string>;
};

export function notEmpty<TValue>(
    value: TValue | null | undefined
): value is TValue {
    return value !== null && value !== undefined;
};

export type IVariablesWithNextToken<Variables extends {}> = Variables & { nextToken: UndefinedGQLType<string> };

function extractGqlList<Data>(result: GraphQLResult): AmplifyListType<Data> | null {
    if (!result) {
        throw new Error('No data');
    }

    let data: any = result;
    while (data.items === undefined) {
        data = data[Object.keys(data)[0]];
        if (!data) {
            throw new Error('No data found in result');
        }
    }
    return data && data.items ? data : null;
};

export const useQueryList = <Data extends {}, Variables extends {}>({ query, variables }: IUseQueryOptions<Variables>): IUseQueryListResult<Data> => {
    const [token, setToken] = useState<UndefinedGQLType<string>>();
    const [nextToken, setNextToken] = useState<UndefinedGQLType<string>>();
    const [list, setList] = useState<Data[]>([]);

    const { data, isLoading, error, refetch } = useQuery<GraphQLResult, IVariablesWithNextToken<Variables>>({
        query,
        variables: {
            ...variables,
            nextToken: token,
        } as IVariablesWithNextToken<Variables>,
        rawData: true,
    });

    useDeepCompareEffect(() => {
        setList([]);
    }, [variables]);

    useEffect(() => {

        const listData = data ? extractGqlList<Data>(data) : null;

        setList(list => {
            let updatedItems = list;
            if (listData) {

                const newList: Data[] | null =
                listData && listData.items && listData.items.filter(notEmpty);
                if (newList) {
                    updatedItems = updatedItems.concat(newList);
                }
                return updatedItems;
            }
            return [];
        });

        if (listData) {
            setNextToken(listData.nextToken);
        }
    }, [data]);

    return { data: list, isLoading, error, refetch, next: () => setToken(nextToken) };
};
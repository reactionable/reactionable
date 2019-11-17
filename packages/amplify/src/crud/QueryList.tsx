import { useState, useEffect } from 'react';
import { IUseQueryListResult } from '@reactionable/core';
import { useQuery, IUseQueryOptions, useDeepCompareEffect } from './Query';

export type UndefinedGQLType<T> = T | null | undefined;
export type AmplifyListType<Data> = {
    __typename: string;
    items: Data[] | null;
    nextToken: UndefinedGQLType<string>;
};

export function notEmpty<TValue>(
    value: TValue | null | undefined
): value is TValue {
    // console.warn('notEmpty is provided for convenience and demonstration, there are probably better alternatives.')
    return value !== null && value !== undefined;
};

export type IVariablesWithNextToken<Variables extends {}> = Variables & { nextToken: UndefinedGQLType<string> };

export const useQueryList = <Data extends {}, Variables extends {}>({ query, variables }: IUseQueryOptions<Variables>): IUseQueryListResult<Data> => {
    const [token, setToken] = useState<UndefinedGQLType<string>>();
    const [nextToken, setNextToken] = useState<UndefinedGQLType<string>>();
    const [list, setList] = useState<Data[]>([]);

    const { data, isLoading, error, refetch } = useQuery<AmplifyListType<Data>, IVariablesWithNextToken<Variables>>({
        query,
        variables: {
            ...variables,
            nextToken: token,
        } as IVariablesWithNextToken<Variables>
    });

    useDeepCompareEffect(() => {
        setList([]);
    }, [variables]);

    useEffect(() => {
        setList(list => {
            let updatedItems = list;
            if (data) {
                const newList: Data[] | null =
                    data && data.items && data.items.filter(notEmpty);
                if (newList) {
                    updatedItems = updatedItems.concat(newList);
                }
                return updatedItems;
            }
            return [];
        });

        if (data) {
            setNextToken(data.nextToken);
        }
    }, [data]);

    return { data: list, isLoading, error, refetch, next: () => setToken(nextToken) };
};
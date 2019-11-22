import { useState, useEffect } from 'react';
import { IUseQueryListResult, IUseQueryListOptions as ICoreUseQueryListOptions, useQuery as coreUseQuery } from '@reactionable/core';
import { GraphQLResult } from '@aws-amplify/api/lib-esm/types';
import { IUseQueryOptions, query, IQueryOptions } from './Query';

export type IQueryListOptions<Variables extends {}> = IQueryOptions<Variables & { nextToken: UndefinedGQLType<string> }> & {
    queryAll?: boolean;
};

export type UndefinedGQLType<T> = T | null | undefined;

export type AmplifyListType<Data> = {
    items: Data[];
    nextToken?: string | null;
};

export async function queryList<Data extends {}, Variables extends {}>(options: IQueryListOptions<Variables>): Promise<AmplifyListType<Data>> {
    const items: Array<Data> = [];
    while (true) {
        const result = await query<Data, IQueryListOptions<Variables>>({
            ...options,
            rawData: true,
        });
        const data = extractGqlList<Data>(result);
        items.push(...data.items);
        if (
            !options.queryAll
            || !data.nextToken
        ) {
            return { ...data, items };
        }

        // Set next token variable
        options.variables = {
            ...options.variables as Variables,
            nextToken: data.nextToken,
        };
    }
};

export type IUseQueryListOptions<
    Data extends {},
    Variables extends {}
    > = IUseQueryOptions<Data, Variables> & Omit<
        ICoreUseQueryListOptions<Variables>,
        'handleQuery'
    >;

export const useQueryList = <Data extends {}, Variables extends {}>(options: IUseQueryListOptions<Data, Variables>): IUseQueryListResult<Data> => {
    const [token, setToken] = useState<UndefinedGQLType<string>>();
    const [nextToken, setNextToken] = useState<UndefinedGQLType<string>>();
    const [previousToken, setPreviousToken] = useState<UndefinedGQLType<string>>();
    const [list, setList] = useState<Data[]>([]);

    const { refetch, data, ...result } = coreUseQuery<AmplifyListType<Data>, IQueryListOptions<Variables>>({
        ...options,
        handleQuery: queryOptions => queryList<Data, Variables>(queryOptions),
    });

    const refetchList = () => {
        setList([]);
        refetch();
    };
    const next = () => {
        setPreviousToken(token);
        setToken(nextToken);
    };
    const previous = () => {
        setToken(previousToken);
    };

    useEffect(() => {
        setList(data ? data.items || [] : []);
        if (data) {
            setNextToken(data.nextToken);
        }
    }, [data]);

    return {
        ...result,
        data: list,
        refetch: refetchList,
        next: nextToken ? next : undefined,
        previous: previousToken ? previous : undefined,
    };
};

function extractGqlList<Data extends {}>(result: GraphQLResult): AmplifyListType<Data> {
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
    return data;
};
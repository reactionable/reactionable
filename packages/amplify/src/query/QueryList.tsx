import { useState, useEffect } from 'react';
import {
  IUseQueryListResult,
  IUseQueryListOptions as ICoreUseQueryListOptions,
  useQuery as useQueryCore,
} from '@reactionable/core';
import { IUseQueryOptions, query, IQueryOptions } from './Query';

export type UndefinedType<T> = T | null | undefined;

export type IQueryListOptions<Variables extends {}> = IQueryOptions<
  Variables & {
    nextToken?: UndefinedType<string>;
  }
> & {
  queryAll?: boolean;
};

export type AmplifyListType<Data> = {
  items: Data[];
  nextToken?: UndefinedType<string>;
};

export async function queryList<Data extends {}, Variables extends {}>(
  options: IQueryListOptions<Variables>
): Promise<AmplifyListType<Data>> {
  const items: Array<Data> = [];
  let tmpOptions = Object.assign({}, options);
  while (true) {
    const result = await query<Data, IQueryListOptions<Variables>>({
      ...tmpOptions,
      rawData: true,
    });

    const data = extractListData<Data>(result);

    items.push(...data.items);
    if (!tmpOptions.queryAll || !data.nextToken) {
      return { ...data, items };
    }

    // Set next token variable
    tmpOptions = Object.assign(tmpOptions, {
      variables: {
        ...(tmpOptions.variables as Variables),
        nextToken: data.nextToken,
      },
    });
  }
}

export type IUseQueryListOptions<Data extends {}, Variables extends {}> = IUseQueryOptions<
  Data,
  Variables
> &
  Omit<ICoreUseQueryListOptions<Variables>, 'handleQuery'>;

export const useQueryList = <Data extends {}, Variables extends {}>(
  options: IUseQueryListOptions<Data, Variables>
): IUseQueryListResult<Data> => {
  const [currentToken, setCurrentToken] = useState<UndefinedType<string>>();
  const [nextToken, setNextToken] = useState<UndefinedType<string>>();
  const [previousToken, setPreviousToken] = useState<UndefinedType<string>>();
  const [list, setList] = useState<Data[]>([]);

  const { refetch, data, ...result } = useQueryCore<
    AmplifyListType<Data>,
    IQueryListOptions<Variables>
  >({
    ...options,
    variables: {
      ...options.variables,
      nextToken: currentToken,
    },
    handleQuery: (queryOptions) => queryList<Data, Variables>(queryOptions),
  });

  const refetchList = () => {
    setList([]);
    refetch();
  };

  const next = () => {
    setPreviousToken(currentToken);
    setCurrentToken(nextToken);
  };

  const previous = () => setCurrentToken(previousToken);

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
    previous: currentToken ? previous : undefined,
  };
};

function extractListData<Data extends {}>(result: any): AmplifyListType<Data> {
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
}

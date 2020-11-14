import {
  IUseQueryListOptions as ICoreUseQueryListOptions,
  IUseQueryListResult as ICoreUseQueryListResult,
  useQuery as useQueryCore,
} from "@reactionable/core";
import { useEffect, useState } from "react";

import { IData, IQueryOptions, IVariables, query } from "./Query";
import { IUseQueryOptions } from "./useQuery";

export type IListVariables = IVariables & {
  limit?: number | null;
  nextToken?: UndefinedType<string>;
};

export type UndefinedType<T> = T | null | undefined;

export type IUseQueryListResult<Data> = ICoreUseQueryListResult<Data>;

export type IQueryListOptions<Variables extends IListVariables> = IQueryOptions<Variables> & {
  queryAll?: boolean;
};

export type AmplifyListType<Data> = {
  items: Data[];
  nextToken?: UndefinedType<string>;
};

export async function queryList<Data extends IData, Variables extends IListVariables>(
  options: IQueryListOptions<Variables>
): Promise<AmplifyListType<Data>> {
  const items: Array<Data> = [];
  let tmpOptions = Object.assign({}, options);
  let shouldFetchMore = true;
  while (shouldFetchMore) {
    const result = await query<Data, IQueryListOptions<Variables>>({
      ...tmpOptions,
      rawData: true,
    });

    const data = extractListData<Data>(result);

    items.push(...data.items);

    // Aws do not apply filters before applying limit
    const limitVariable = options?.variables?.limit;
    const limitNotReached = limitVariable && items.length - 1 < limitVariable;

    shouldFetchMore = !!(data.nextToken && (tmpOptions.queryAll || limitNotReached));
    if (!shouldFetchMore) {
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
  return { items };
}

export type IUseQueryListOptions<
  Data extends IData,
  Variables extends IListVariables
> = IUseQueryOptions<Data, Variables> & Omit<ICoreUseQueryListOptions<Variables>, "handleQuery">;

export const useQueryList = <Data extends IData, Variables extends IListVariables>(
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
    } as Variables,
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

type IDataWithItems<Data extends IData> =
  | { [key: string]: IDataWithItems<Data> | unknown }
  | AmplifyListType<Data>;
function extractListData<Data extends IData>(result: IDataWithItems<Data>): AmplifyListType<Data> {
  if (!result) {
    throw new Error("No data");
  }

  let data: IDataWithItems<Data> = result;
  while (data.items === undefined) {
    data = data[Object.keys(data)[0]];
    if (!data) {
      throw new Error("No data found in result");
    }
  }

  return data as AmplifyListType<Data>;
}

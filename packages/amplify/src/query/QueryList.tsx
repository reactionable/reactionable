import { IUseQueryListResult as ICoreUseQueryListResult } from "@reactionable/core";

import {
  IVariables as IAmplifyVariables,
  IData,
  IQueryOptions,
  query as amplifyQuery,
} from "../query/Query";

export type UndefinedType<T> = T | null | undefined;

export type IListVariables = IAmplifyVariables & {
  nextToken?: UndefinedType<string>;
  limit?: UndefinedType<number>;
};

export type IUseQueryListResult<TData extends IData = IData> = ICoreUseQueryListResult<TData> & {
  next?: () => void;
  previous?: () => void;
};

export type IQueryListOptions<TVariables extends IListVariables = IListVariables> =
  IQueryOptions<TVariables> & {
    queryAll?: boolean;
  };

export type AmplifyListType<TData extends IData = IData> = {
  items: TData[];
  nextToken?: UndefinedType<string>;
};

export async function queryList<
  TData extends IData = IData,
  TVariables extends IListVariables = IListVariables
>(options: IQueryListOptions<TVariables>): Promise<AmplifyListType<TData>> {
  return fetchListData([], options);
}

async function fetchListData<
  TData extends IData = IData,
  TVariables extends IListVariables = IListVariables
>(items: Array<TData>, options: IQueryListOptions<TVariables>): Promise<AmplifyListType<TData>> {
  const result = await amplifyQuery<TData, IQueryListOptions<TVariables>>({
    ...options,
    rawData: true,
  });

  const data = extractListData<TData>(result as IResultData<TData>);
  items.push(...data.items);

  // Aws do not apply filters before applying limit
  const limit = options?.variables?.limit;
  const limitNotReached = limit && items.length - 1 < limit;
  const shouldFetchMore = data.nextToken && (options.queryAll || limitNotReached);
  if (!shouldFetchMore) {
    return { ...data, items };
  }

  return fetchListData(items, {
    ...options,
    // Set next token variable
    variables: Object.assign(options.variables || {}, {
      nextToken: data.nextToken,
    }) as TVariables,
  });
}

type IResultData<TData extends IData = IData> =
  | AmplifyListType<TData>
  | Record<string, unknown>
  | null
  | undefined;

function extractListData<TData extends IData = IData>(
  result: IResultData<TData>
): AmplifyListType<TData> {
  let data = result as IResultData<TData>;
  while (!isAmplifyListType<TData>(data)) {
    if (!data) {
      throw new Error("No data");
    }
    data = data[Object.keys(data)[0]] as IResultData<TData>;
  }

  return data as AmplifyListType<TData>;
}

function isAmplifyListType<TData extends IData = IData>(
  data: IResultData<TData>
): data is AmplifyListType<TData> {
  return Array.isArray(data?.items);
}

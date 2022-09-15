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
  const items: Array<TData> = [];
  let tmpOptions = Object.assign({}, options);
  while (true) {
    const result = await amplifyQuery<TData, IQueryListOptions<TVariables>>({
      ...tmpOptions,
      rawData: true,
    });

    const data = extractListData<TData>(result);

    items.push(...data.items);

    // Aws do not apply filters before applying limit
    const limit = options?.variables?.limit;
    const limitNotReached = limit && items.length - 1 < limit;

    const shouldFetchMore = data.nextToken && (tmpOptions.queryAll || limitNotReached);
    if (!shouldFetchMore) {
      return { ...data, items };
    }

    // Set next token variable
    tmpOptions = {
      ...tmpOptions,
      variables: Object.assign(tmpOptions.variables || {}, {
        nextToken: data.nextToken,
      }) as TVariables,
    };
  }
}

function extractListData<TData extends IData = IData>(result: any): AmplifyListType<TData> {
  if (!result) {
    throw new Error("No data");
  }

  let data: any = result;
  while (data.items === undefined) {
    data = data[Object.keys(data)[0]];
    if (!data) {
      throw new Error("No data found in result");
    }
  }
  return data;
}

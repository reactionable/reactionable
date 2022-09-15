import { IUseQueryOptions, useQuery } from "@reactionable/core";
import { useEffect, useState } from "react";

import { IData } from "./Query";
import {
  AmplifyListType,
  IListVariables,
  IQueryListOptions,
  IUseQueryListResult,
  UndefinedType,
  queryList,
} from "./QueryList";

export type IUseQueryListOptions<
  TData extends IData = IData,
  TVariables extends IListVariables = IListVariables
> = Omit<IQueryListOptions<TVariables>, "query"> &
  Omit<IUseQueryOptions<TData, TVariables>, "handleQuery">;

export const useQueryList = <
  TData extends IData = IData,
  TVariables extends IListVariables = IListVariables
>(
  query: IQueryListOptions<TVariables>["query"],
  options?: IUseQueryListOptions<TData, TVariables>
): IUseQueryListResult<TData> => {
  const [currentToken, setCurrentToken] = useState<UndefinedType<string>>();
  const [nextToken, setNextToken] = useState<UndefinedType<string>>();
  const [previousToken, setPreviousToken] = useState<UndefinedType<string>>();
  const [list, setList] = useState<TData[]>([]);

  const variables: TVariables = {
    ...options?.variables,
    nextToken: currentToken,
  } as TVariables;

  const queryOptions: IUseQueryOptions<AmplifyListType<TData>, TVariables> = {
    ...options,
    variables,
    handleQuery: (options) => queryList({ query, ...options }),
  };

  const { refetch, data, ...result } = useQuery<AmplifyListType<TData>, TVariables>(queryOptions);

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
    data: {
      items: list,
      count: 0,
    },
    refetch: refetchList,
    next: nextToken ? next : undefined,
    previous: currentToken ? previous : undefined,
  };
};

import { useState } from "react";

import { IError } from "../error/IError";
import { useDeepCompareEffect } from "../hooks/useDeepCompareEffect";

export type IData = unknown;
export type IVariables = Record<string, unknown>;

export type IQueryOptions<Variables extends IVariables = IVariables> = {
  variables?: Variables;
};

export interface IUseQueryResult<Data extends IData = IData> {
  isLoading: boolean;
  error?: IError;
  data?: Data;
  refetch: () => void;
}

export type IUseQueryOptions<
  Data extends IData,
  Options extends IQueryOptions = IQueryOptions
> = Options & {
  handleQuery: (queryOptions: Options) => Promise<Data>;
};

export function useQuery<
  Data extends IData = IData,
  Options extends IQueryOptions = IQueryOptions
>({ handleQuery, ...queryOptions }: IUseQueryOptions<Data, Options>): IUseQueryResult<Data> {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<IError | undefined>(undefined);
  const [data, setData] = useState<Data | undefined>(undefined);

  const fetchQuery = async (queryOptions: Options) => {
    try {
      setLoading(true);
      const data = await handleQuery(queryOptions);
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchQuery((queryOptions as unknown) as Options);
  };

  useDeepCompareEffect(() => {
    fetchQuery((queryOptions as unknown) as Options);
  }, [queryOptions]);

  return {
    isLoading,
    data,
    error,
    refetch,
  };
}

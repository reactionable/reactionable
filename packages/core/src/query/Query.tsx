import { useState } from 'react';

import { IError } from '../error/IError';
import { useDeepCompareEffect } from '../hooks/useDeepCompareEffect';

export type IVariables = { [key: string]: any };

export type IQueryOptions<Variables extends IVariables = {}> = {
  variables?: Variables;
};

export interface IUseQueryResult<Data> {
  isLoading: boolean;
  error?: IError;
  data?: Data;
  refetch: () => void;
}

export type IUseQueryOptions<Data extends {}, O extends IQueryOptions = IQueryOptions<any>> = O & {
  handleQuery: (queryOptions: O) => Promise<Data>;
};

export function useQuery<Data extends {}, O extends IQueryOptions = IQueryOptions<any>>({
  handleQuery,
  ...queryOptions
}: IUseQueryOptions<Data, O>): IUseQueryResult<Data> {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<IError | undefined>(undefined);
  const [data, setData] = useState<Data | undefined>(undefined);

  const fetchQuery = async (queryOptions: O) => {
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
    fetchQuery((queryOptions as unknown) as O);
  };

  useDeepCompareEffect(() => {
    fetchQuery((queryOptions as unknown) as O);
  }, [queryOptions]);

  return {
    isLoading,
    data,
    error,
    refetch,
  };
}

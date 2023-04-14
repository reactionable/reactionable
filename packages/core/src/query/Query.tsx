import { useState } from "react";

import { IError } from "../error/IError";
import { useDeepCompareEffect } from "../hooks/useDeepCompareEffect";

export type IData = Record<string, unknown>;
export type IVariables = Record<string, unknown>;

export type IQueryOptions<Variables extends IVariables = IVariables> = {
  variables?: Variables;
};

export type IUseQueryOptions<
  Data extends IData,
  Variables extends IVariables
> = IQueryOptions<Variables> & {
  handleQuery: (queryOptions: IQueryOptions<Variables>) => Promise<Data>;
};
export interface IUseQueryResult<Data extends IData | null = IData> {
  loading: boolean;
  error?: IError;
  data?: Data;
  refetch: () => void;
}

export function useQuery<Data extends IData = IData, Variables extends IVariables = IVariables>({
  handleQuery,
  ...queryOptions
}: IUseQueryOptions<Data, Variables>): IUseQueryResult<Data> {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<IError | undefined>(undefined);
  const [data, setData] = useState<Data | undefined>(undefined);

  const fetchQuery = async (queryOptions: IQueryOptions<Variables>) => {
    try {
      setLoading(true);
      const data = await handleQuery(queryOptions);
      setData(data);
    } catch (error) {
      setError(error as IError);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchQuery(queryOptions as IQueryOptions<Variables>);
  };

  useDeepCompareEffect(() => {
    fetchQuery(queryOptions as IQueryOptions<Variables>);
  }, [queryOptions]);

  return {
    loading,
    data,
    error,
    refetch,
  };
}

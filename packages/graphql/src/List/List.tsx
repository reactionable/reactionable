import { useQuery, QueryResult, gql } from '@apollo/react-hooks';
import { IListProps } from '@reactionable/core';

export type IUseListCallback<Data = any> = Pick<IListProps<Data>, 'isLoading' | 'error' | 'data'> &
  Pick<QueryResult<Data>, 'refetch' | 'fetchMore'>;

export const useListCallback: <Data = any>(
  query: string,
  variables?: Object
) => IUseListCallback<Data> = (query, variables = {}) => {
  const { loading, error, data, refetch, fetchMore } = useQuery(
    gql`
      ${query}
    `,
    { variables }
  );

  return {
    isLoading: !!loading,
    error: error ? error : undefined,
    data: !loading && !error ? extractGqlData(data) : [],
    refetch,
    fetchMore,
  };
};

const extractGqlData: <Data = any, Result = any>(data?: Data) => Array<Result> = (data) => {
  let dataResult: any = data;
  while (dataResult) {
    dataResult = dataResult[Object.keys(dataResult)[0]];

    if (Array.isArray(dataResult)) {
      return dataResult;
    }
  }

  throw new Error('No data found in result');
};

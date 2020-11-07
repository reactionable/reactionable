import { QueryResult } from '@apollo/react-hooks';
import { IListProps } from '@reactionable/core';

import { IOperationVariables } from '../../Client';
import { IQueryHookOptions, useQuery } from '../../useQuery';

export type IUseListCallback<Data = any> = Pick<IListProps<Data>, 'isLoading' | 'error' | 'data'> &
  Pick<QueryResult<Data>, 'refetch' | 'fetchMore'>;

export function useListQuery<TData = any, TVariables = IOperationVariables>(
  query: string,
  options?: IQueryHookOptions<TData, TVariables>
): IUseListCallback<TData> {
  const { loading, data, ...result } = useQuery<TData, TVariables>(query, options);

  return {
    isLoading: !!loading,
    data: [],
    ...result,
  };
}

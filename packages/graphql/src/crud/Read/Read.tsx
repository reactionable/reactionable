import { IOperationVariables } from '../../Client';
import { IQueryHookOptions, useQuery } from '../../useQuery';

export function useReadQuery<TData = any, TVariables = IOperationVariables>(
  query: string,
  options?: IQueryHookOptions<TData, TVariables>
) {
  const { loading, ...result } = useQuery<TData, TVariables>(query, options);

  return {
    isLoading: !!loading,
    ...result,
  };
}

import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';

export const useReadCallback = async (query: string, variables?: Object) => {
  const { loading, error, data, refetch } = useQuery(
    gql`
      ${query}
    `,
    { variables }
  );

  return {
    loading,
    error,
    data: !loading && !error ? data[Object.keys(data)[0]] : data,
    refetch,
  };
};

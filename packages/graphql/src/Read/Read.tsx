import { useQuery, gql } from '@apollo/react-hooks';

export const useReadCallback = (query: string, variables?: Object) => {
  const { loading, error, data, refetch } = useQuery(
    gql`
      ${query}
    `,
    { variables }
  );

  let realData = null;
  if (!loading && !error) {
    if (!data) {
      throw new Error('No data');
    }
    realData = data[Object.keys(data)[0]];
  }

  return {
    isLoading: !!loading,
    error,
    data: realData,
    refetch,
  };
};

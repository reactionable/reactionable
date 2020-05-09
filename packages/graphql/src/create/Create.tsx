import { MutationFetchResult, useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';

type IUseCreateCallback<Result> = (mutation: string) => Promise<Result>;

export const useCreateCallback: IUseCreateCallback<any> = async (mutation: string) => {
  const [mutationCallback] = useMutation(
    gql`
      ${mutation}
    `
  );

  return async (values: any) => {
    const response: void | MutationFetchResult = await mutationCallback({
      variables: {
        data: values,
      },
    });

    if (!response || !response.data) {
      throw new Error('An error has occured');
    }

    return response.data[Object.keys(response.data)[0]];
  };
};

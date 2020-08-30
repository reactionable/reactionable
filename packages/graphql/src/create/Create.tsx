import { gql, useMutation } from '@apollo/react-hooks';

type IUseCreateCallback<Result> = (mutation: string) => Promise<Result>;

export const useCreateCallback: IUseCreateCallback<any> = async (mutation: string) => {
  const [mutationCallback] = useMutation(
    gql`
      ${mutation}
    `
  );

  return async (values: any) => {
    const response = await mutationCallback({
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

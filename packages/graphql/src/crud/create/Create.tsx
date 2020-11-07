import { useMutation } from '../../useMutation';

type IUseCreateCallback<Result> = (mutation: string) => Promise<Result>;

export const useCreateMutation: IUseCreateCallback<any> = async (mutation: string) => {
  const { mutate } = useMutation(mutation);

  return async (values: any) => {
    const { data } = await mutate({
      variables: {
        data: values,
      },
    });

    if (!data) {
      throw new Error('An error has occured');
    }

    return data;
  };
};

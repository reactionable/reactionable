import { useMutation } from '../../useMutation';

export const useDeleteMutation = ({ id, mutation }: { id: string; mutation: string }) => {
  const { mutate } = useMutation<any, { id: string }>(mutation);
  return async () => {
    const { data } = await mutate({
      variables: { id },
    });

    if (!data) {
      throw new Error('An error has occured');
    }

    return data;
  };
};

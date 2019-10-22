import { useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';

export const useDeleteCallback = ({ id, mutation, }: { id: string, mutation: string }) => {
    const [mutationCallback] = useMutation<any, { id: string }>(gql`${mutation}`);
    return async () => {
        const data = await mutationCallback({
            variables: { id },
        });

        if (!data) {
            throw new Error('No data');
        }

        let tmpData: any = data;
        while (tmpData.data === undefined) {
            tmpData = tmpData[Object.keys(tmpData)[0]];
            if (!tmpData) {
                throw new Error('No data found in result');
            }
        }
        return tmpData;
    };
};
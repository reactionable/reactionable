import * as React from 'react';
import { EnhanceChildren } from '../../enhance-children/EnhanceChildren';
import { useUIContext } from '../../ui/UI';

export interface IDeleteProps<Data> {
    title: string;
    successMessage: string;
    confirmationMessage: string;
    onConfirm: () => Promise<Data>;
    onSuccess?: (result: Data) => void;
};

export type DeleteComponent<Data> = React.FC<IDeleteProps<Data>>;

export function Delete<Data>(props: React.PropsWithChildren<IDeleteProps<Data>>) {
    const { useLoader, useSuccessNotification, useErrorNotification, useConfirmation } = useUIContext();
    const { loader, isLoading, setLoading } = useLoader({});
    const { successNotification, setSuccessNotification } = useSuccessNotification({ title: props.title });
    const { errorNotification, setErrorNotification } = useErrorNotification({ title: props.title });

    const { confirmation, setConfirmation } = useConfirmation({
        title: props.title,
        children: props.confirmationMessage,
        callback: (confirm: boolean) => {
            if (!confirm) {
                return;
            }
            setLoading(true);

            props.onConfirm().then(data => {
                setLoading(false);
                if (props.onSuccess) {
                    props.onSuccess(data);
                }
                setSuccessNotification(props.successMessage);
            }).catch(error => {
                setLoading(false);
                setErrorNotification(error);
            });
        },
    });

    const onClick = () => setConfirmation(true);

    return <>
        <EnhanceChildren children={props.children} enhance={{ onClick, disabled: isLoading }} />
        {successNotification}
        {errorNotification}
        {confirmation}
        {loader}
    </>;
}
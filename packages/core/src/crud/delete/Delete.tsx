import React from 'react';
import { useConfirmation, ConfirmationComponent } from '../../confirmation/Confirmation';
import { IUseLoader } from '../../loader/Loader';
import { IUseNotification } from '../../notification/Notification';
import { EnhanceChildren } from '../../enhance-children/EnhanceChildren';

export interface IDeleteProps<Data> {
    successMessage: string;
    confirmation: ConfirmationComponent;
    confirmationTitle: string;
    onConfirm: () => Promise<Data>;
    onSuccess?: (result: Data) => void;
    successNotification: IUseNotification;
    errorNotification: IUseNotification;
    loader: IUseLoader;
};

export type DeleteComponent<Data = any> = React.FC<IDeleteProps<Data>>;

export const Delete: DeleteComponent = (props) => {

    const { notification: successNotification, setNotification: setSuccessNotification } = props.successNotification;
    const { notification: errorNotification, setNotification: setErrorNotification } = props.errorNotification;
    const { loader, isLoading, setLoading } = props.loader;
    
    const { confirmation, setConfirmation } = useConfirmation({
        title: props.confirmationTitle,
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
        Component: props.confirmation
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
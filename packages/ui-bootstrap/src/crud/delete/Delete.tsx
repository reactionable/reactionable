import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Delete as DeleteCore, IDeleteProps as ICoreDeleteProps } from '@reactionable/core';
import { Confirmation } from '../../confirmation/Confirmation';
import { useSuccessNotification, useErrorNotification } from '../../notification/Notification';
import { useLoader } from '../../loader/Loader';

export interface IDeleteProps<Data> extends Pick<ICoreDeleteProps<Data>, 'onConfirm' | 'onSuccess' | 'successMessage'> {
    title: string;
    label?: string;
};

export const Delete: React.FC<IDeleteProps<any>> = ({ title, label, ...props }) => {

    return <DeleteCore
        confirmationTitle={title}
        confirmation={Confirmation}
        successNotification={useSuccessNotification(title)}
        errorNotification={useErrorNotification()}
        loader={useLoader()}
        {...props}
    >
        <Button
            variant="danger"
            title={title || ''}
        >
            <FontAwesomeIcon icon={faTrashAlt} />
            {label}
        </Button>
    </DeleteCore>;
}
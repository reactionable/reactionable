import React, { PropsWithChildren } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Delete as DeleteCore, IDeleteProps as ICoreDeleteProps } from '@reactionable/core';

export interface IDeleteProps<Data> extends ICoreDeleteProps<Data> {
    label?: string;
};

export function Delete<Data>({ label, ...props }: PropsWithChildren<IDeleteProps<Data>>) {

    return <DeleteCore<Data>
        {...props}
    >
        <Button
            variant="danger"
            title={props.title || ''}
        >
            <FontAwesomeIcon icon={faTrashAlt} />
            {label}
        </Button>
    </DeleteCore>;
}
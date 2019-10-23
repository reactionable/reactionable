import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import Alert from 'react-bootstrap/Alert';
import { ErrorAlertComponent, useErrorAlert as useErrorAlertCore, isIError } from '@reactionable/core';

export const ErrorAlert: ErrorAlertComponent = (props) => {


    let text: string | React.ReactNode;
    if (isIError(props.children)) {
        text = props.children.message;
    }
    else {
        text = props.children;
    }

    return <Alert variant="danger">
        <FontAwesomeIcon icon={faExclamationCircle} /> {text}
    </Alert>;
};

export const useErrorAlert = () => {
    return useErrorAlertCore({ Component: ErrorAlert });
};
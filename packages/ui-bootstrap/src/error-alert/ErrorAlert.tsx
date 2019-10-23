import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import Alert from 'react-bootstrap/Alert';
import { ErrorAlertComponent, useErrorAlert as useErrorAlertCore } from '@reactionable/core';

export const ErrorAlert: ErrorAlertComponent = (props) => {

    let text = '';
    switch (true) {
        case (props.children instanceof Error):
        case 'string' === typeof props.children:
            text = props.children + '';
            break;
        default:
            text = JSON.stringify(props.children, null, '  ');
    }

    return <Alert variant="danger">
        <FontAwesomeIcon icon={faExclamationCircle} /> {text}
    </Alert>;
};

export const useErrorAlert = () => {
    return useErrorAlertCore({ Component: ErrorAlert });
};
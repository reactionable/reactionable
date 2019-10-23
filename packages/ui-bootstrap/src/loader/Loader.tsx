import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';
import { ILoaderProps, IUseLoaderProps, useLoader as useLoaderCore } from '@reactionable/core';

export const Loader: React.FC<ILoaderProps & {
    overlay?: boolean,
}> = ({ overlay = true }) => {
    const { t } = useTranslation();
    const spinnerElement = <Spinner animation="grow" role="status" variant="primary">
        <span className="sr-only">{t('Loading')}</span>
    </Spinner>;
    if (!overlay) {
        return spinnerElement;
    }
    return <div
        className="spinner--overlay"
        style={{
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: '50%',
            left: '50%',
        }}
    >{spinnerElement}</div>;
};

export const useLoader = (props: Omit<IUseLoaderProps, 'Component'> = {}) => {
    return useLoaderCore({ ...props, Component: Loader });
};


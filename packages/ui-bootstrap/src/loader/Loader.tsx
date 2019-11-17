import React, { FC } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';
import {
    ILoaderProps as ICoreLoaderProps,
    IUseLoaderProps as ICoreUseLoaderProps,
    useLoader as useLoaderCore,
    IUseLoader,
} from '@reactionable/core';

export type ILoaderProps = ICoreLoaderProps & {
    overlay?: boolean,
};

export const Loader: FC<ILoaderProps> = ({ overlay = true }) => {
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

export type IUseLoaderProps = ICoreUseLoaderProps & ILoaderProps;

export const useLoader: IUseLoader<IUseLoaderProps> = (props) => {
    return useLoaderCore({ ...props, Component: Loader });
};


import * as React from 'react';
import { Read as CoreRead, IListProps as ICoreListProps } from '@reactionable/core';
import { Loader } from '../../loader/Loader';
import { ErrorAlert } from '../../error-alert/ErrorAlert';

export interface IReadProps<Data> extends Omit<ICoreListProps<Data>, 'LoaderComponent' | 'ErrorAlertComponent'> {
};

export type ReadComponent<Data = any> = React.FC<IReadProps<Data>>;
export const Read: ReadComponent = (props) => {
    return <CoreRead
        LoaderComponent={Loader}
        ErrorAlertComponent={ErrorAlert}
        {...props}
    />;
};
import * as React from 'react';
import { Read as CoreRead, IReadProps as ICoreReadProps } from '@reactionable/core';
import { Loader } from '../../loader/Loader';
import { useErrorAlert } from '../../alert/ErrorAlert';

export interface IReadProps<Data> extends Omit<ICoreReadProps<Data>, 'LoaderComponent' | 'errorAlert'> {
};

export type ReadComponent<Data = any> = React.FC<IReadProps<Data>>;
export const Read: ReadComponent = (props) => {
    const errorAlert = useErrorAlert()
    return <CoreRead
        LoaderComponent={Loader}
        errorAlert={errorAlert}
        {...props}
    />;
};
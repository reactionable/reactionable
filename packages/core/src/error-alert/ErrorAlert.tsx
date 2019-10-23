import React, { useState, ReactElement, ReactNode } from 'react';

export interface IError extends Error {
    code?: number;
}

export function isIError(arg: any): arg is IError {
    return arg.name !== undefined && arg.message !== undefined;
}

export interface IErrorAlertProps { };
export type ErrorAlertComponent = React.FC<IErrorAlertProps> & {
    children?: ReactNode | IError
}
export interface IUseErrorAlertProps extends IErrorAlertProps {
    Component: ErrorAlertComponent;
};
export interface IUseErrorAlert {
    errorAlert: ReactElement;
    setError: (error: IError) => void;
};

export const useErrorAlert = ({ Component, ...props }: IUseErrorAlertProps): IUseErrorAlert => {
    const [error, setError] = useState<IError | undefined>(undefined);
    return {
        errorAlert: <>{error && <Component {...props} />}</>,
        setError: (error: IError) => {
            setError(error);
        },
    };
};

import React, { useState, ReactElement } from 'react';

export interface IErrorAlertProps { };
export type ErrorAlertComponent = React.FC<IErrorAlertProps>;
export interface IUseErrorAlertProps extends IErrorAlertProps {
    Component: ErrorAlertComponent;
};
export interface IUseErrorAlert {
    errorAlert: ReactElement;
    setError: (error: any) => void;
};

export const useErrorAlert = ({ Component, ...props }: IUseErrorAlertProps): IUseErrorAlert => {
    const [error, setError] = useState<string | undefined>(undefined);
    return {
        errorAlert: <>{error && <Component {...props} />}</>,
        setError: (error: any) => {
            let errorText = '';
            switch (true) {
                case (error instanceof Error):
                case 'string' === typeof error:
                    errorText = error + '';
                    break;
                default:
                    errorText = JSON.stringify(error, null, '  ');
            }
            setError(errorText);
        },
    };
};

import * as React from 'react';

export interface IAlertProps { };

export type AlertComponent = React.FC<IAlertProps>;

export type IUseAlertProps = React.PropsWithChildren<IAlertProps> & {
    Component: AlertComponent;
};

export interface IUseAlert {
    alert: React.ReactElement;
    setAlert: (alert?: React.ReactNode) => void;
};

export const useAlert = ({ Component, ...props }: IUseAlertProps): IUseAlert => {
    const [alert, setAlert] = React.useState<React.ReactNode | undefined>(props.children
        ? props.children
        : undefined
    );
    return {
        alert: <>{alert && <Component {...props} children={alert} />}</>,
        setAlert: (alert?: React.ReactNode) => {
            setAlert(alert);
        },
    };
};

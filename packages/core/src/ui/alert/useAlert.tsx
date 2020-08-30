import React, { ReactNode, useState } from 'react';

import { Alert, AlertComponent, IUseAlertProps, IUseAlertResult } from './Alert';

export function useAlert<P extends IUseAlertProps = IUseAlertProps>(
  { Component, ...props }: P & { Component: AlertComponent } = {
    ...({ children: undefined } as P),
    Component: Alert,
  }
): IUseAlertResult {
  const [alert, setAlert] = useState<ReactNode | undefined>(
    props.children ? props.children : undefined
  );

  return {
    alert: <>{alert && <Component {...props} children={alert} />}</>,
    setAlert: (alert?: ReactNode) => {
      setAlert(alert);
    },
  };
}

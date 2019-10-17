import React, { useState, PropsWithChildren, ReactElement } from 'react';

export interface IConfirmationProps {
  title: string;
  callback: (confirm: boolean) => void;
};

export type ConfirmationComponent = React.FC<IConfirmationProps>;
export type IUseConfirmationProps = PropsWithChildren<IConfirmationProps> & {
  Component: ConfirmationComponent;
};

export interface IUseConfirmation {
  confirmation: ReactElement;
  setConfirmation: (confirmation: boolean) => void;
};

export const useConfirmation = ({ Component, ...props }: IUseConfirmationProps): IUseConfirmation => {
  const [confirmation, setConfirmation] = useState<boolean>(false);

  const callback = props.callback;
  props.callback = (confirm: boolean) => {
    setConfirmation(false);
    callback(confirm);
  };

  return {
    confirmation: <>{confirmation && <Component {...props} />}</>,
    setConfirmation
  }
}
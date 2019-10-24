import * as React from 'react';

export interface IConfirmationProps {
  title: string;
  callback: (confirm: boolean) => void;
};

export type ConfirmationComponent = React.FC<IConfirmationProps>;
export type IUseConfirmationProps = React.PropsWithChildren<IConfirmationProps> & {
  Component: ConfirmationComponent;
};

export interface IUseConfirmation {
  confirmation: React.ReactElement;
  setConfirmation: (confirmation: boolean) => void;
};

export const useConfirmation = ({ Component, ...props }: IUseConfirmationProps): IUseConfirmation => {
  const [confirmation, setConfirmation] = React.useState<boolean>(false);

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
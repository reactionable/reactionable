import * as React from 'react';

export type IConfirmationProps = {
  title: string;
  callback: (confirm: boolean) => void;
};

export type ConfirmationComponent = React.FC<IConfirmationProps>;
export type IUseConfirmationProps = React.PropsWithChildren<IConfirmationProps>;

export interface IUseConfirmationResult {
  confirmation: React.ReactElement;
  setConfirmation: (confirmation: boolean) => void;
};

export type IUseConfirmation<P extends IUseConfirmationProps> = (props: P) => IUseConfirmationResult;
export function useConfirmation<P extends IUseConfirmationProps>({ Component, callback, ...props }: P & { Component: ConfirmationComponent }): IUseConfirmationResult {
  const [confirmation, setConfirmation] = React.useState<boolean>(false);

  const confirmCallback = (confirm: boolean) => {
    setConfirmation(false);
    callback(confirm);
  };

  return {
    confirmation: <>{confirmation && <Component callback={confirmCallback} {...props} />}</>,
    setConfirmation
  }
}
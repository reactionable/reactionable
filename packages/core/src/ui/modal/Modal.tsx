import React, { FC, PropsWithChildren, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface IModalProps {
  title: string;
  show?: boolean;
  onHide?: () => void;
}

export type ModalComponent<P extends IModalProps = IModalProps> = FC<P>;

export const Modal: ModalComponent = ({ title,show = true, onHide, children, ...modalProps }) => {
  const { t } = useTranslation();
  const [showState, setShow] = useState(show);

  const handleOnClose = () => {
      setShow(false);
      onHide && onHide();
  }

  return (
    <>
      {showState && (
        <div {...modalProps}>
          <div>
            <div>{title}</div>
            <button onClick={handleOnClose}>{t('Close')}</button>
          </div>
          {children}
        </div>
      )}
    </>
  );
};

export type IUseModalProps<P extends IModalProps = IModalProps> = PropsWithChildren<P>;

export type IUseModalResult = {
  modal: ReactElement;
  openModal: () => void;
  closeModal: () => void;
};

export type IUseModal<P extends IUseModalProps> = (props: P) => IUseModalResult;

export function useModal<P extends IUseModalProps>({
  Component,
  show,
  onHide,
  ...props
}: P & {
  Component: ModalComponent<any>;
}): IUseModalResult {
  const [showState, setShow] = useState(show);

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  const handleOnHide = () => {
    closeModal();
    onHide && onHide();
  }


  return {
    modal: <Component {...props} show={showState} onHide={handleOnHide}/>,
    openModal,
    closeModal,
  };
}

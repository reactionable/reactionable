import React, { ComponentType, PropsWithChildren, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface IModalProps {
  title: string;
  show?: boolean;
  onHide?: () => void;
}

export type ModalComponent<P extends IModalProps = IModalProps> = ComponentType<P>;

export const Modal: ModalComponent = ({
  title,
  children,
  onHide,
  show,

  ...modalProps
}) => {
  const { t } = useTranslation();
  const handleOnClose = () => {
    onHide && onHide();
  };

  return (
    <div {...modalProps} hidden={!show}>
      <div>
        <div>{title}</div>
        <button onClick={handleOnClose}>{t('Close')}</button>
      </div>
      {children}
    </div>
  );
};

export type IUseModalProps<P extends IModalProps = IModalProps> = PropsWithChildren<
  P & {
    Component?: ModalComponent<P>;
  }
>;

export type IUseModalResult = {
  modal: ReactNode;
  openModal: () => void;
  closeModal: () => void;
};

export type IUseModal<P extends IUseModalProps> = (props: P) => IUseModalResult;

export function useModal<P extends IUseModalProps>({
  Component,
  show,
  onHide,
  ...props
}: P): IUseModalResult {
  const [showState, setShow] = useState(show);

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  const handleOnHide = () => {
    closeModal();
    onHide && onHide();
  };

  const ModalComponent = Component || Modal;

  return {
    modal: <ModalComponent {...props} show={showState} onHide={handleOnHide} />,
    openModal,
    closeModal,
  };
}

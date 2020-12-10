import { ComponentType, PropsWithChildren, ReactElement, ReactNode, useState } from "react";

import { useTranslation } from "../../i18n/I18n";

export interface IModalProps {
  title: ReactNode;
  show?: boolean;
  onHide?: () => void;
}

export type ModalComponent<P extends IModalProps = IModalProps> = ComponentType<P>;

export function Modal<P extends IModalProps = IModalProps>({
  title,
  children,
  onHide,
  show,

  ...modalProps
}: PropsWithChildren<P>): ReactElement {
  const { t } = useTranslation();
  const handleOnClose = () => {
    onHide && onHide();
  };

  return (
    <div {...modalProps} hidden={!show}>
      <div>
        <div>{title}</div>
        <button onClick={handleOnClose}>{t("Close")}</button>
      </div>
      {children}
    </div>
  );
}

export type IUseModalProps<ModalProps extends IModalProps = IModalProps> = PropsWithChildren<
  ModalProps & {
    Component?: ModalComponent<ModalProps>;
  }
>;

export type IUseModalResult = {
  modal: ReactElement;
  openModal: () => void;
  closeModal: () => void;
};

export type IUseModal<UseModalProps extends IUseModalProps> = (
  props: UseModalProps
) => IUseModalResult;

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

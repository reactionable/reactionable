import {
  IFormData,
  IFormValues,
  FormFields,
  IFormFieldsProps,
  IFormWrapperProps,
  useTranslation,
  ModalForm as CoreModalForm,
  IModalFormProps as ICoreModalFormProps,
} from "@reactionable/core";
import { ReactElement } from "react";
import BootstrapModal from "react-bootstrap/Modal";

import { IFormButtonProps, useFormButton, useSubmitFormButton } from "../form/FormButton";

export type IModalFormProps<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps,
> = ICoreModalFormProps<Values, Data, FormButtonProps>;

type IModalFormChildrenProps<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps,
> = {
  submitButton: IModalFormProps<Values, Data, FormButtonProps>["submitButton"];
  cancelButton: IModalFormProps<Values, Data, FormButtonProps>["cancelButton"];
  children: IModalFormProps<Values, Data, FormButtonProps>["children"];
  closeModal: IModalFormProps<Values, Data, FormButtonProps>["closeModal"];
  formikProps: IFormFieldsProps<Values>["formikProps"];
};

function ModalFormChildren<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps,
>({
  cancelButton,
  submitButton,
  children,
  closeModal,
  formikProps,
}: IModalFormChildrenProps<Values, Data, FormButtonProps>) {
  const { t } = useTranslation("common");
  const submit = useSubmitFormButton({
    children: submitButton ?? true,
    disabled: formikProps.isSubmitting,
  });

  const cancel = useFormButton({
    children: cancelButton || t("Cancel"),
    disabled: formikProps.isSubmitting,
    onClick: closeModal,
    variant: "secondary",
  });

  return (
    <>
      <BootstrapModal.Body>
        <FormFields<Values> formikProps={formikProps}>{children}</FormFields>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        {cancel}
        {submitButton !== false && submit}
      </BootstrapModal.Footer>
    </>
  );
}

export function ModalForm<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps = IFormButtonProps,
>({
  children,
  submitButton,
  cancelButton,
  ...props
}: IModalFormProps<Values, Data, FormButtonProps>): ReactElement {
  const formChildren: IFormWrapperProps<Values, FormButtonProps>["children"] = (formikProps) => (
    <ModalFormChildren<Values, Data, FormButtonProps>
      cancelButton={cancelButton}
      submitButton={submitButton}
      closeModal={props.closeModal}
      formikProps={formikProps}
    >
      {children}
    </ModalFormChildren>
  );

  return (
    <CoreModalForm<Values, Data, FormButtonProps> {...props} submitButton={false}>
      {formChildren}
    </CoreModalForm>
  );
}

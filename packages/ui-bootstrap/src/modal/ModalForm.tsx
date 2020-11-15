import { IFormData, IFormValues } from "@reactionable/core/lib/form/Form";
import { FormFields, IFormFieldsProps } from "@reactionable/core/lib/form/FormFields";
import { IFormWrapperProps } from "@reactionable/core/lib/form/FormWrapper";
import { useTranslation } from "@reactionable/core/lib/i18n/I18n";
import {
  ModalForm as CoreModalForm,
  IModalFormProps as ICoreModalFormProps,
} from "@reactionable/core/lib/ui/modal/ModalForm";
import React, { ReactElement } from "react";
import BootstrapModal from "react-bootstrap/Modal";

import { IFormButtonProps, useFormButton, useSubmitFormButton } from "../form/FormButton";

export type IModalFormProps<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps
> = ICoreModalFormProps<Values, Data, FormButtonProps>;

type IModalFormChildrenProps<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps
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
  FormButtonProps extends IFormButtonProps
>({
  cancelButton,
  submitButton,
  children,
  closeModal,
  formikProps,
}: IModalFormChildrenProps<Values, Data, FormButtonProps>) {
  const submit = useSubmitFormButton({
    children: submitButton,
    disabled: formikProps.isSubmitting,
  });

  const { t } = useTranslation();
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
        {submit}
      </BootstrapModal.Footer>
    </>
  );
}

export function ModalForm<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps
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

  return <CoreModalForm<Values, Data, FormButtonProps> {...props}>{formChildren}</CoreModalForm>;
}

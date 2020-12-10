import { FormikHelpers } from "formik";

import { IFormData, IFormProps, IFormValues } from "../../form/Form";
import { IFormButtonProps } from "../../form/FormButton";
import { useUIContext } from "../UI";
import { IModalProps, IUseModalProps, IUseModalResult } from "./Modal";
import { ModalForm, ModalFormComponent } from "./ModalForm";

export type IUseModalFormProps<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps,
  ModalProps extends IModalProps
> = ModalProps & { form: IFormProps<Values, Data, FormButtonProps> } & {
  Component?: ModalFormComponent<Values, Data, FormButtonProps>;
};

export function useModalForm<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps,
  ModalProps extends IModalProps
>({
  form: { onSuccess, onSubmit, ...form },
  title,
  Component,
  ...modalProps
}: IUseModalFormProps<Values, Data, FormButtonProps, ModalProps>): IUseModalResult {
  const { useModal } = useUIContext();

  const formProps = {
    ...form,
    title,
    onSubmit: async (values: Values, formikHelpers: FormikHelpers<Values>) => {
      const result = await onSubmit(values, formikHelpers);
      return result;
    },
    onSuccess: (data: Data) => {
      if (onSuccess) {
        onSuccess(data);
      }
      useModalResult.closeModal();
    },
    closeModal: () => useModalResult.closeModal(),
  };

  if (!Component) {
    Component = ModalForm;
  }

  const formElement = <Component {...formProps} />;

  const useModalProps: IUseModalProps = {
    ...modalProps,
    title,
    children: formElement,
  };

  const useModalResult = useModal(useModalProps);

  return useModalResult;
}

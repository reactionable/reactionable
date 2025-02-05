import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import Button from "react-bootstrap/Button";
import { string } from "yup";

import { UIContextProvider, useUIProviderProps } from "../UI";
import { IUseModalProps, Modal, useModal } from "./Modal";
import { ModalForm } from "./ModalForm";
import { IUseModalFormProps, useModalForm } from "./useModalForm";
import { FormField } from "../../form/FormField";

const meta: Meta<typeof Modal> = {
  title: "Core/Components/UI/Modal",
  component: Modal,
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const BasicModal: Story = {
  args: {
    title: "Basic modal",
    show: true,
    children: (
      <>
        <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.{" "}
        <b>Lorem Ipsum</b> has been the industry&apos;s standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of
        Letraset sheets containing <b>Lorem Ipsum</b> passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of <b>Lorem Ipsum</b>
      </>
    ),
    onHide: action("Modal closed"),
  },
};

export const UseModalHook: StoryObj<IUseModalProps> = {
  args: {
    onHide: action("Modal closed"),
    title: "Basic modal",
    children: (
      <>
        <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.{" "}
        <b>Lorem Ipsum</b> has been the industry&apos;s standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of
        Letraset sheets containing <b>Lorem Ipsum</b> passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of <b>Lorem Ipsum</b>
      </>
    ),
  },
  render: (props) => {
    const ModalHook = () => {
      const { openModal, modal } = useModal(props);
      return (
        <>
          <Button onClick={() => openModal()}>Open modal</Button>
          {modal}
        </>
      );
    };
    return (
      <UIContextProvider {...useUIProviderProps()}>
        <ModalHook />
      </UIContextProvider>
    );
  },
};

interface IFormValues {
  test: string;
}
interface IFormData {
  test: string;
}

export const ModalWithForm: StoryObj<typeof ModalForm<IFormValues, IFormData>> = {
  args: {
    submitButton: "Submit form",
    closeModal: action("Modal closed"),
    onSubmit: async (values: IFormValues) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      action("Form submit")(values);
      return values;
    },
    onSuccess: action("Form submit succeed"),
    validationSchema: { test: string().required("Test is required") },
    initialValues: { test: "" },
  },
  render: (props) => {
    return (
      <UIContextProvider {...useUIProviderProps()}>
        <ModalForm {...props}>
          <FormField name="test" />
        </ModalForm>
      </UIContextProvider>
    );
  },
};

export const UseModalFormHook: StoryObj<IUseModalFormProps<IFormValues, IFormData>> = {
  args: {
    onHide: action("Modal closed"),
    title: "Modal with form",
    form: {
      submitButton: "Submit form",
      onSubmit: async (values: IFormValues) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        action("Form submit")(values);
        return values;
      },
      onSuccess: action("Form submit succeed"),
      validationSchema: { test: string().required("Test is required") },
      initialValues: { test: "" },
      children: <FormField name="test" autoFocus placeholder="Basic form input" />,
    },
  },
  render: (props) => {
    const ModalFormHook = () => {
      const { openModal, modal } = useModalForm(props);
      return (
        <>
          <Button onClick={() => openModal()}>Open modal with form</Button>
          {modal}
        </>
      );
    };
    return (
      <UIContextProvider {...useUIProviderProps()}>
        <ModalFormHook />
      </UIContextProvider>
    );
  },
};

import Button from "@material-ui/core/Button/Button";
import { action } from "@storybook/addon-actions";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import { ReactElement } from "react";
import { string } from "yup";

import { FormField } from "../form/FormField";
import { UIContextProvider } from "../UI";
import { Modal, useModal } from "./Modal";
import { ModalForm } from "./ModalForm";
import { useModalForm } from "./useModalForm";

export default {
  title: "UI Material/Components/Modal",
  decorators: [withKnobs],
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    component: Modal,
    subComponents: [useModal, ModalForm, useModalForm],
  },
};

export const BasicModal = (): ReactElement => {
  const show = boolean("Show", true);
  return (
    <Modal
      title="Basic modal"
      show={show}
      body={
        <>
          <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.{" "}
          <b>Lorem Ipsum</b> has been the industry&apos;s standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
          release of Letraset sheets containing <b>Lorem Ipsum</b> passages, and more recently with
          desktop publishing software like Aldus PageMaker including versions of <b>Lorem Ipsum</b>
        </>
      }
      footer={<>Basic modal footer</>}
      onHide={action("Modal closed")}
    />
  );
};

export const UseModalHook = (): ReactElement => {
  const ModalHook = () => {
    const { openModal, modal } = useModal({
      onHide: action("Modal closed"),
      title: "Basic modal",
      body: (
        <>
          <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.{" "}
          <b>Lorem Ipsum</b> has been the industry&apos;s standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
          release of Letraset sheets containing <b>Lorem Ipsum</b> passages, and more recently with
          desktop publishing software like Aldus PageMaker including versions of <b>Lorem Ipsum</b>
        </>
      ),
      footer: <>Basic modal footer</>,
    });
    return (
      <>
        <Button onClick={() => openModal()}>Open modal</Button>
        {modal}
      </>
    );
  };
  return (
    <UIContextProvider>
      <ModalHook />
    </UIContextProvider>
  );
};

interface IFormValues {
  test: string;
}

export const ModalWithForm = (): ReactElement => {
  return (
    <UIContextProvider>
      <ModalForm
        submitButton="Submit form"
        closeModal={action("Modal closed")}
        onSubmit={async (values: IFormValues) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          action("Form submit")(values);
          return values;
        }}
        onSuccess={action("Form submit succeed")}
        validationSchema={{ test: string().required("Test is required") }}
        initialValues={{ test: "" }}
      >
        <FormField name="test" />
      </ModalForm>
    </UIContextProvider>
  );
};

export const UseModalFormHook = (): ReactElement => {
  const ModalFormHook = () => {
    const { openModal, modal } = useModalForm({
      onHide: action("Modal closed"),
      title: "Modal with form",
      form: {
        submitButton: "Submit form",
        onSubmit: async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          action("Form submit")(values);
          return values;
        },
        onSuccess: action("Form submit succeed"),
        validationSchema: { test: string().required("Test is required") },
        initialValues: { test: "" },
        children: <FormField name="test" autoFocus placeholder="Basic form input" />,
      },
    });
    return (
      <>
        <Button onClick={() => openModal()}>Open modal with form</Button>
        {modal}
      </>
    );
  };
  return (
    <UIContextProvider>
      <ModalFormHook />
    </UIContextProvider>
  );
};

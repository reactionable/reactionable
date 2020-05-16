import React from 'react';
import { string } from 'yup';
import { action } from '@storybook/addon-actions';
import Button from 'react-bootstrap/Button';
import { Modal, useModal } from '../src/modal/Modal';
import { ModalForm, useModalForm } from '../src/modal/ModalForm';
import { FormField } from '../src/form/FormField';
import { UIContextProvider } from '../src/UI';
import './config';

export default {
  title: 'UI Bootstrap/Modal',
  parameters: { info: { inline: true }, component: Modal },
};

export const SimpleModal = () => {
  return (
    <Modal
      title="Simple modal"
      body={<>Simple modal body</>}
      footer={<>Simple modal footer</>}
      onHide={action('Modal closed')}
    />
  );
};

export const useModalHook = () => {
  const { openModal, modal } = useModal({
    onHide: action('Modal closed'),
    title: 'Modal with form',
    body: <>Simple modal body</>,
    footer: <>Simple modal footer</>,
  });

  return (
    <UIContextProvider>
      <Button onClick={() => openModal()}>Open modal</Button>
      {modal}
    </UIContextProvider>
  );
};

interface IFormValues {
  test: string;
}

export const ModalWithForm = () => {
  return (
    <UIContextProvider>
      <ModalForm
        title="Modal with form"
        submitButton="Submit form"
        closeModal={action('Modal closed')}
        onSubmit={async (values: IFormValues) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          action('Form submit')(values);
          return values;
        }}
        onSuccess={action('Form submit succeed')}
        formSchema={{ test: string().required('Test is required') }}
        formValues={{ test: '' }}
        children={() => <FormField name="test" />}
      />
    </UIContextProvider>
  );
};

export const useModalFormHook = () => {
  const { openModal, modal } = useModalForm({
    onHide: action('Modal closed'),
    title: 'Modal with form',
    form: {
      submitButton: 'Submit form',
      onSubmit: async (values: IFormValues) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        action('Form submit')(values);
        return values;
      },
      onSuccess: action('Form submit succeed'),
      formSchema: { test: string().required('Test is required') },
      formValues: { test: '' },
      children: () => <FormField name="test" autoFocus placeholder="Simple form input" />,
    },
  });
  return (
    <UIContextProvider>
      <Button onClick={() => openModal()}>Open modal with form</Button>
      {modal}
    </UIContextProvider>
  );
};

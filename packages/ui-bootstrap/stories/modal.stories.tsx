import './config';

import { action } from '@storybook/addon-actions';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { string } from 'yup';

import { FormField } from '../src/form/FormField';
import { Modal, useModal } from '../src/modal/Modal';
import { ModalForm } from '../src/modal/ModalForm';
import { useModalForm } from '../src/modal/useModalForm';
import { UIContextProvider } from '../src/UI';

export default {
  title: 'UI Bootstrap/Modal',
  parameters: {
    info: { inline: true },
    component: Modal,
    subComponents: [useModal, ModalForm, useModalForm],
  },
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
  const ModalHook = () => {
    const { openModal, modal } = useModal({
      onHide: action('Modal closed'),
      title: 'Modal with form',
      body: <>Simple modal body</>,
      footer: <>Simple modal footer</>,
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
        validationSchema={{ test: string().required('Test is required') }}
        initialValues={{ test: '' }}
        children={() => <FormField name="test" />}
      />
    </UIContextProvider>
  );
};

export const UseModalFormHook = () => {
  const ModalFormHook = () => {
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
        validationSchema: { test: string().required('Test is required') },
        initialValues: { test: '' },
        children: () => <FormField name="test" autoFocus placeholder="Simple form input" />,
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

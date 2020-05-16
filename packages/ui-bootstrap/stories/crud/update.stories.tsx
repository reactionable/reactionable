import React from 'react';
import { string } from 'yup';
import { action } from '@storybook/addon-actions';
import Button from 'react-bootstrap/Button';
import { FormField } from '../../src/form/FormField';
import { Update } from '../../src/crud/update/Update';
import { UIContextProvider } from '../../src/UI';
import '../config';

export default {
  title: 'UI Bootstrap/Crud/Update',
  parameters: {
    info: { inline: true },
    component: Update,
  },
};

interface IFormValues {
  test: string;
}

export const SimpleUpdate = () => (
  <UIContextProvider>
    <Update
      form={{
        title: 'Update form',
        submitButton: true,
        onSubmit: async (values: IFormValues) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          action('Form submit')(values);
          return values;
        },
        onSuccess: action('Form submit succeed'),
        formSchema: { test: string().required('Test is required') },
        formValues: { test: 'test value' },
        children: () => <FormField name="test" autoFocus placeholder="Simple form input" />,
      }}
    />
  </UIContextProvider>
);

export const UpdateInModal = () => (
  <UIContextProvider>
    <Update
      modal
      form={{
        title: 'Update form',
        submitButton: true,
        onSubmit: async (values: IFormValues) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          action('Form submit')(values);
          return values;
        },
        onSuccess: action('Form submit succeed'),
        formSchema: { test: string().required('Test is required') },
        formValues: { test: 'test value' },
        children: () => <FormField name="test" autoFocus placeholder="Simple form input" />,
      }}
    >
      <Button>Open update form in modal</Button>
    </Update>
  </UIContextProvider>
);

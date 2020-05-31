import React from 'react';
import { string } from 'yup';
import { action } from '@storybook/addon-actions';
import { FormField } from '../../src/form/FormField';
import { Update } from '../../src/crud/update/Update';
import { UIContextProvider } from '../../src/ui/UI';

export default {
  title: 'Core/Crud/Update',
  parameters: { info: { inline: true }, component: Update },
};

interface IFormValues {
  test: string;
}

export const update = () => (
  <UIContextProvider>
    <Update
      form={{
        title: 'Update form',
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

export const updateInModal = () => (
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
      <button>Open update form in modal</button>
    </Update>
  </UIContextProvider>
);

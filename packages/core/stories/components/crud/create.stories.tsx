import { action } from '@storybook/addon-actions';
import React from 'react';
import { string } from 'yup';

import { Create } from '../../../src/crud/create/Create';
import { FormField } from '../../../src/form/FormField';
import { UIContextProvider, useUIProviderProps } from '../../../src/ui/UI';

export default {
  title: 'Core/Components/Crud/Create',
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Create },
};

interface IFormValues {
  test: string;
}

export const SimpleCreate = () => (
  <UIContextProvider {...useUIProviderProps()}>
    <Create
      form={{
        title: 'Create form',
        submitButton: true,
        onSubmit: async (values: IFormValues) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          action('Form submit')(values);
          return values;
        },
        onSuccess: action('Form submit succeed'),
        validationSchema: { test: string().required('Test is required') },
        initialValues: { test: '' },
        children: () => <FormField name="test" autoFocus placeholder="Simple form input" />,
      }}
    />
  </UIContextProvider>
);

export const CreateInModal = () => (
  <UIContextProvider {...useUIProviderProps()}>
    <Create
      modal
      form={{
        title: 'Create form',
        submitButton: true,
        onSubmit: async (values: IFormValues) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          action('Form submit')(values);
          return values;
        },
        onSuccess: action('Form submit succeed'),
        validationSchema: { test: string().required('Test is required') },
        initialValues: { test: '' },
        children: () => <FormField name="test" autoFocus placeholder="Simple form input" />,
      }}
    >
      <button>Open create form in modal</button>
    </Create>
  </UIContextProvider>
);
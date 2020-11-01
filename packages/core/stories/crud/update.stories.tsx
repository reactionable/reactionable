import { action } from '@storybook/addon-actions';
import React from 'react';
import { string } from 'yup';

import { Update } from '../../src/crud/update/Update';
import { FormField } from '../../src/form/FormField';
import { UIContextProvider, useUIProviderProps } from '../../src/ui/UI';

export default {
  title: 'Core/Crud/Update',
  parameters: { info: { inline: true }, component: Update },
};

interface IFormValues {
  test: string;
}

export const update = () => (
  <UIContextProvider {...useUIProviderProps()}>
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
        validationSchema: { test: string().required('Test is required') },
        initialValues: { test: 'test value' },
        children: () => <FormField name="test" autoFocus placeholder="Simple form input" />,
      }}
    />
  </UIContextProvider>
);

export const updateInModal = () => (
  <UIContextProvider {...useUIProviderProps()}>
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
        validationSchema: { test: string().required('Test is required') },
        initialValues: { test: 'test value' },
        children: () => <FormField name="test" autoFocus placeholder="Simple form input" />,
      }}
    >
      <button>Open update form in modal</button>
    </Update>
  </UIContextProvider>
);

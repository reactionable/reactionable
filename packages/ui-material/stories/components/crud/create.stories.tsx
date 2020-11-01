import Button from '@material-ui/core/Button/Button';
import { action } from '@storybook/addon-actions';
import React from 'react';
import { string } from 'yup';

import { Create } from '../../../src/crud/create/Create';
import { FormField } from '../../../src/form/FormField';
import { UIContextProvider } from '../../../src/UI';

export default {
  title: 'UI Material/Components/Crud/Create',
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Create },
};

interface IFormValues {
  test: string;
}

export const SimpleCreate = () => (
  <UIContextProvider>
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
  <UIContextProvider>
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
      <Button>Open create form in modal</Button>
    </Create>
  </UIContextProvider>
);

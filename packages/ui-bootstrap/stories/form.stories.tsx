import React from 'react';
import { string } from 'yup';
import { action } from '@storybook/addon-actions';
import { Form } from '../src/form/Form';
import { FormField } from '../src/form/FormField';
import './config';
import { UIContextProvider } from '../src/UI';

export default {
  title: 'UI Bootstrap/Form',
  parameters: {
    info: { inline: true },
    component: Form,
  },
};

interface IFormValues {
  test: string;
}

export const SimpleForm = () => (
  <UIContextProvider>
    <Form
      title="Create form"
      submitButton
      onSubmit={async (values: IFormValues) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        action('Form submit')(values);
        return values;
      }}
      onSuccess={action('Form submit succeed')}
      formSchema={{ test: string().required('Test is required') }}
      formValues={{ test: '' }}
      children={() => <FormField name="test" autoFocus placeholder="Simple form input" />}
    />
  </UIContextProvider>
);

export const FormWithTextArea = () => (
  <UIContextProvider>
    <Form
      title="Create form"
      submitButton
      onSubmit={async (values: IFormValues) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        action('Form submit')(values);
        return values;
      }}
      onSuccess={action('Form submit succeed')}
      formSchema={{ test: string().required('Test is required') }}
      formValues={{ test: '' }}
      children={() => (
        <FormField<'textarea'>
          as="textarea"
          name="test"
          autoFocus
          placeholder="Text area form input"
        />
      )}
    />
  </UIContextProvider>
);

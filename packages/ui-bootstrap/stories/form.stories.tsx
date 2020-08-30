import './config';

import { action } from '@storybook/addon-actions';
import React from 'react';
import { string } from 'yup';

import { Form } from '../src/form/Form';
import { FormField } from '../src/form/FormField';
import { UIContextProvider } from '../src/UI';

export default {
  title: 'UI Bootstrap/Form',
  parameters: { info: { inline: true }, component: Form },
};

interface IFormValues {
  test: string;
}

export const SimpleForm = () => (
  <UIContextProvider>
    <Form
      title="Simple form"
      submitButton
      onSubmit={async (values: IFormValues) => {
        action('Form submitted...')(values);
        await new Promise((resolve) => setTimeout(resolve, 1000));
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
      title="Form with textarea"
      submitButton
      onSubmit={async (values: IFormValues) => {
        action('Form submitted...')(values);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return values;
      }}
      onSuccess={action('Form submit succeed')}
      formSchema={{ test: string().required('Test is required') }}
      formValues={{ test: '' }}
      children={() => (
        <FormField as="textarea" name="test" autoFocus placeholder="Text area form input" />
      )}
    />
  </UIContextProvider>
);

export const FormWithSelect = () => (
  <UIContextProvider>
    <Form
      title="Form with select"
      submitButton
      onSubmit={async (values: IFormValues) => {
        action('Form submitted...')(values);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return values;
      }}
      onSuccess={action('Form submit succeed')}
      formSchema={{ test: string().required('Test is required') }}
      formValues={{ test: '' }}
      children={() => (
        <FormField as="select" name="test" autoFocus>
          <>
            <option value="">Choose an option</option>
            <option value="1">First option</option>
            <option value="2">Second option</option>
          </>
        </FormField>
      )}
    />
  </UIContextProvider>
);

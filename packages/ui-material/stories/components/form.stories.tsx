import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { action } from '@storybook/addon-actions';
import React from 'react';
import { string } from 'yup';

import { Form } from '../../src/form/Form';
import { FormField } from '../../src/form/FormField';
import { UIContextProvider } from '../../src/UI';

export default {
  title: 'UI Material/Components/Form',
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Form },
  subComponents: [FormField],
};

interface IFormValues {
  test: string;
}

export const SimpleForm = () => (
  <UIContextProvider>
    <Form
      title="Simple form"
      submitButton
      onSubmit={async (values) => {
        action('Form submitted...')(values);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return values;
      }}
      onSuccess={action('Form submit succeed')}
      validationSchema={{ test: string().required('Test is required') }}
      initialValues={{ test: '' }}
      children={() => <FormField name="test" autoFocus placeholder="Simple form input" />}
    />
  </UIContextProvider>
);

export const FormWithLabelledInput = () => (
  <UIContextProvider>
    <Form
      title="Simple form"
      submitButton
      onSubmit={async (values) => {
        action('Form submitted...')(values);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return values;
      }}
      onSuccess={action('Form submit succeed')}
      validationSchema={{ test: string().required('Test is required') }}
      initialValues={{ test: '' }}
      children={() => (
        <FormField label="Test" name="test" autoFocus placeholder="Simple form input" />
      )}
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
      validationSchema={{ test: string().required('Test is required') }}
      initialValues={{ test: '' }}
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
      validationSchema={{ test: string().required('Test is required') }}
      initialValues={{ test: '' }}
      children={() => (
        <FormField as="select" name="test" autoFocus>
          <MenuItem value="">Choose an option</MenuItem>
          <MenuItem value="1">First option</MenuItem>
          <MenuItem value="2">Second option</MenuItem>
        </FormField>
      )}
    />
  </UIContextProvider>
);

export const FormWithCheckbox = () => (
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
      validationSchema={{ test: string().required('Test is required') }}
      initialValues={{ test: '' }}
      children={() => <FormField label="Test" type="checkbox" name="test" autoFocus />}
    />
  </UIContextProvider>
);

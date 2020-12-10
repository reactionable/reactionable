import { action } from "@storybook/addon-actions";
import { ReactElement } from "react";
import { string } from "yup";

import { UIContextProvider } from "../UI";
import { Form } from "./Form";
import { FormField } from "./FormField";

export default {
  title: "UI Bootstrap/Components/Form",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Form },
  subComponents: [FormField],
};

interface IFormValues {
  test: string;
}

export const BasicForm = (): ReactElement => (
  <UIContextProvider>
    <Form
      title="Basic form"
      submitButton
      onSubmit={async (values) => {
        action("Form submitted...")(values);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return values;
      }}
      onSuccess={action("Form submit succeed")}
      validationSchema={{ test: string().required("Test is required") }}
      initialValues={{ test: "" }}
    >
      <FormField name="test" autoFocus placeholder="Basic form input" />
    </Form>
  </UIContextProvider>
);

export const FormWithLabelledInput = (): ReactElement => (
  <UIContextProvider>
    <Form
      title="Basic form"
      submitButton
      onSubmit={async (values) => {
        action("Form submitted...")(values);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return values;
      }}
      onSuccess={action("Form submit succeed")}
      validationSchema={{ test: string().required("Test is required") }}
      initialValues={{ test: "" }}
    >
      <FormField label="Test" name="test" autoFocus placeholder="Basic form input" />
    </Form>
  </UIContextProvider>
);

export const FormWithTextArea = (): ReactElement => (
  <UIContextProvider>
    <Form
      title="Form with textarea"
      submitButton
      onSubmit={async (values: IFormValues) => {
        action("Form submitted...")(values);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return values;
      }}
      onSuccess={action("Form submit succeed")}
      validationSchema={{ test: string().required("Test is required") }}
      initialValues={{ test: "" }}
    >
      <FormField as="textarea" name="test" autoFocus placeholder="Text area form input" />
    </Form>
  </UIContextProvider>
);

export const FormWithSelect = (): ReactElement => (
  <UIContextProvider>
    <Form
      title="Form with select"
      submitButton
      onSubmit={async (values: IFormValues) => {
        action("Form submitted...")(values);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return values;
      }}
      onSuccess={action("Form submit succeed")}
      validationSchema={{ test: string().required("Test is required") }}
      initialValues={{ test: "" }}
    >
      <FormField as="select" name="test" autoFocus>
        <option value="">Choose an option</option>
        <option value="1">First option</option>
        <option value="2">Second option</option>
      </FormField>
    </Form>
  </UIContextProvider>
);

export const FormWithCheckbox = (): ReactElement => (
  <UIContextProvider>
    <Form
      title="Form with select"
      submitButton
      onSubmit={async (values: IFormValues) => {
        action("Form submitted...")(values);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return values;
      }}
      onSuccess={action("Form submit succeed")}
      validationSchema={{ test: string().required("Test is required") }}
      initialValues={{ test: "" }}
    >
      <FormField label="Test" type="checkbox" name="test" autoFocus />
    </Form>
  </UIContextProvider>
);

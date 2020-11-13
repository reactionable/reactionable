import { action } from "@storybook/addon-actions";
import React, { ReactElement } from "react";
import { string } from "yup";

import { Form } from "../../../src/form/Form";
import { FormField } from "../../../src/form/FormField";
import { UIContextProvider, useUIProviderProps } from "../../../src/ui/UI";

export default {
  title: "Core/Components/Form",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Form },
  subComponents: [FormField],
};

interface IFormValues {
  test: string;
}

export const Introduction = (): ReactElement => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="jumbotron">
            <h1 className="display-4">
              <code>@reactionable/core</code> - <code>Form</code>
            </h1>
            <hr />
            <p className="lead">
              Form component helps to render Form and fields, manage form state and validation
            </p>
            <p>
              It is based on <a href="https://formik.org/">Formik</a> and{" "}
              <a href="https://github.com/jquense/yup">Yup</a>
            </p>
            <h5>How to render a form (template): </h5>
            <pre className="border shadow-sm rounded bg-white p-2">
              <code>{`import { Form } from "@reactionable/ui-material/lib/form/Form";
import { FormField } from "@reactionable/ui-material/lib/form/FormField";
import { ... } from 'yup';

const MyForm = (): ReactElement => (
  <Form {Form props}>
    <FormField {Form field props} />
  </Form>
);`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SimpleForm = (): ReactElement => (
  <UIContextProvider {...useUIProviderProps()}>
    <Form
      title="Simple form"
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
      {() => <FormField name="test" autoFocus placeholder="Simple form input" />}
    </Form>
  </UIContextProvider>
);

export const FormWithTextArea = (): ReactElement => (
  <UIContextProvider {...useUIProviderProps()}>
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
      {() => <FormField as="textarea" name="test" autoFocus placeholder="Text area form input" />}
    </Form>
  </UIContextProvider>
);

export const FormWithSelect = (): ReactElement => (
  <UIContextProvider {...useUIProviderProps()}>
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
      {() => (
        <FormField as="select" name="test" autoFocus>
          <>
            <option value="">Choose an option</option>
            <option value="1">First option</option>
            <option value="2">Second option</option>
          </>
        </FormField>
      )}
    </Form>
  </UIContextProvider>
);

export const FormWithCheckbox = (): ReactElement => (
  <UIContextProvider {...useUIProviderProps()}>
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
      {() => <FormField type="checkbox" name="test" autoFocus />}
    </Form>
  </UIContextProvider>
);

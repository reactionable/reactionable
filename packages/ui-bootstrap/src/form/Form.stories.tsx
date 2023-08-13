import { action } from "@storybook/addon-actions";
import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { FormControl, FormControlProps, InputGroup } from "react-bootstrap";
import Image from "react-bootstrap/Image";
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
      validationSchema={{
        firstname: string().required("Firstname is required"),
        lastname: string().required("Lastname is required"),
      }}
      initialValues={{ firstname: "", lastname: "" }}
    >
      <FormField name="firstname" autoFocus placeholder="Firstname" required />
      <FormField name="lastname" placeholder="Lastname" required />
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
      <FormField label="Test" name="test" autoFocus placeholder="Basic form input" required />
    </Form>
  </UIContextProvider>
);

export const FormWithAppendTextInput = (): ReactElement => (
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
      <FormField name="test" autoFocus placeholder="Basic form input" required>
        {(fieldProps) => (
          <>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <FormControl as="text" {...(fieldProps as FormControlProps)} />
            </InputGroup>
          </>
        )}
      </FormField>
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
      <FormField as="textarea" name="test" autoFocus placeholder="Text area form input" required />
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
      <FormField as="select" name="test" label="Test" autoFocus required>
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
      <FormField label="Test" type="checkbox" name="test" autoFocus required />
    </Form>
  </UIContextProvider>
);

export const FormWithFileAndPreview = (): ReactElement => {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  function fileToDataSrc(file: File): Promise<string | undefined> {
    // Encode the file using the FileReader API
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      try {
        reader.onloadend = () => {
          resolve(reader.result?.toString());
        };
        reader.readAsDataURL(file);
      } catch (error) {
        reject(error);
      }
    });
  }

  useEffect(() => {
    if (file) {
      fileToDataSrc(file).then((src) => {
        setFilePreview(src || null);
      });
    } else {
      setFilePreview(null);
    }
  }, [file]);

  return (
    <UIContextProvider>
      <Form
        title="Form with file"
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
        <FormField
          type="file"
          name="test"
          autoFocus
          required
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFile(event?.target?.files?.length ? event.target.files[0] : null)
          }
        />
        {filePreview && (
          <p>
            <Image thumbnail src={filePreview} height="200" width="200" />
          </p>
        )}
      </Form>
    </UIContextProvider>
  );
};

export const FormSubmitError = (): ReactElement => (
  <UIContextProvider>
    <Form
      title="Form submit error"
      submitButton
      onSubmit={async (values) => {
        action("Form submitted...")(values);

        throw new Error("Submit error");
      }}
      validationSchema={{
        test: string().required("Test is required"),
      }}
      initialValues={{ test: "" }}
    >
      <FormField name="test" autoFocus label="Test" required />
    </Form>
  </UIContextProvider>
);

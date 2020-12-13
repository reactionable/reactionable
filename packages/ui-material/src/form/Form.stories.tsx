import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { action } from "@storybook/addon-actions";
import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { string } from "yup";

import { UIContextProvider } from "../UI";
import { Form } from "./Form";
import { FormField } from "./FormField";

export default {
  title: "UI Material/Components/Form",
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
      <FormField name="firstname" autoFocus placeholder="Firstname" />
      <FormField name="lastname" placeholder="Lastname" />
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
        <MenuItem value="">Choose an option</MenuItem>
        <MenuItem value="1">First option</MenuItem>
        <MenuItem value="2">Second option</MenuItem>
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  })
);

export const FormWithFileAndPreview = (): ReactElement => {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const classes = useStyles();

  function fileToDataSrc(file: File): Promise<string | undefined> {
    // encode the file using the FileReader API
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
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFile(event?.target?.files?.length ? event.target.files[0] : null)
          }
        />
        {filePreview && (
          <p>
            <Avatar src={filePreview} variant="square" className={classes.avatar} />
          </p>
        )}
      </Form>
    </UIContextProvider>
  );
};

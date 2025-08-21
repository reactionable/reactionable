import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import { action } from "storybook/actions";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChangeEvent, ComponentProps, useEffect, useState } from "react";
import { string } from "yup";

import { UIContextProvider } from "../UI";
import { Form } from "./Form";
import { FormField } from "./FormField";

const meta: Meta<typeof Form> = {
  title: "UI Material/Components/Form",
  component: Form,
};

export default meta;

type IFormData = {
  test: string;
};

type IFormValues = {
  test: string;
};

type Story = StoryObj<typeof Form<IFormValues, IFormData>>;

const defaultArgs: Partial<ComponentProps<typeof Form<IFormValues, IFormData>>> = {
  title: "Basic form",
  submitButton: true,
  onSubmit: async (values: IFormValues) => {
    action("Form submitted...")(values);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return values;
  },
  onSuccess: action("Form submit succeed"),
  validationSchema: {
    test: string().required("Test input is required"),
  },
  initialValues: { test: "" },
};

export const BasicForm: Story = {
  args: defaultArgs,
  render: (props) => (
    <UIContextProvider>
      <Form {...props}>
        <FormField name="test" autoFocus placeholder="Test input" required />
      </Form>
    </UIContextProvider>
  ),
};

export const FormWithLabelledInput: Story = {
  args: {
    ...defaultArgs,
    title: "Form with labelled input",
  },
  render: (props) => (
    <UIContextProvider>
      <Form {...props}>
        <FormField label="Test" name="test" autoFocus placeholder="Basic form input" required />
      </Form>
    </UIContextProvider>
  ),
};

export const FormWithTextArea: Story = {
  args: {
    ...defaultArgs,
    title: "Form with textarea",
  },
  render: (props) => (
    <UIContextProvider>
      <Form {...props}>
        <FormField
          as="textarea"
          name="test"
          autoFocus
          placeholder="Text area form input"
          required
        />
      </Form>
    </UIContextProvider>
  ),
};

export const FormWithSelect: Story = {
  args: {
    ...defaultArgs,
    title: "Form with select",
  },
  render: (props) => (
    <UIContextProvider>
      <Form {...props}>
        <FormField as="select" name="test" label="Test" autoFocus required>
          <MenuItem>Choose an option</MenuItem>
          <MenuItem value="1">First option</MenuItem>
          <MenuItem value="2">Second option</MenuItem>
        </FormField>
      </Form>
    </UIContextProvider>
  ),
};

export const FormWithCheckbox: Story = {
  args: {
    ...defaultArgs,
    title: "Form with checkbox",
  },
  render: (props) => (
    <UIContextProvider>
      <Form {...props}>
        <FormField type="checkbox" name="test" label="Test" autoFocus required />
      </Form>
    </UIContextProvider>
  ),
};

export const FormWithFileAndPreview: Story = {
  args: {
    ...defaultArgs,
    title: "Form with file",
  },
  render: (props) => {
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
        <Form {...props}>
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
              <Avatar
                src={filePreview}
                variant="square"
                sx={{
                  width: (theme) => theme.spacing(15),
                  height: (theme) => theme.spacing(15),
                }}
              />
            </p>
          )}
        </Form>
      </UIContextProvider>
    );
  },
};

export const FormSubmitError: Story = {
  args: {
    ...defaultArgs,
    title: "Form with submit error",
    onSubmit: async (values: IFormValues) => {
      action("Form submitted...")(values);
      throw new Error("Submit error");
    },
  },
  render: (props) => (
    <UIContextProvider>
      <Form {...props}>
        <FormField name="test" autoFocus label="Test" required />
      </Form>
    </UIContextProvider>
  ),
};

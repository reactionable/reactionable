import "../../../stories/config";

import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import Button from "react-bootstrap/Button";
import { string } from "yup";

import { FormField } from "../../form/FormField";
import { UIContextProvider } from "../../UI";
import { Create } from "./Create";

const meta: Meta<typeof Create> = {
  title: "UI Bootstrap/Components/Crud/Create",
  component: Create,
};

export default meta;

interface IFormValues {
  test: string;
}

type Story = StoryObj<typeof Create<IFormValues>>;

export const BasicCreate: Story = {
  args: {
    form: {
      title: "Create form",
      onSubmit: async (values: IFormValues) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        action("Form submit")(values);
        return values;
      },
      successMessage: "Creation succeed",
      onSuccess: action("Form submit succeed"),
      validationSchema: { test: string().required("Test is required") },
      initialValues: { test: "" },
      children: <FormField name="test" autoFocus placeholder="Basic form input" />,
    },
  },
  render: ({ form }) => (
    <UIContextProvider>
      <Create form={form} />
    </UIContextProvider>
  ),
};

export const CreateInModal: Story = {
  args: {
    form: {
      title: "Create form",
      onSubmit: async (values: IFormValues) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        action("Form submit")(values);
        return values;
      },
      successMessage: "Creation succeed",
      onSuccess: action("Form submit succeed"),
      validationSchema: { test: string().required("Test is required") },
      initialValues: { test: "" },
      children: <FormField name="test" autoFocus placeholder="Basic form input" />,
    },
    children: <Button>Open create form in modal</Button>,
  },
  render: (props) => (
    <UIContextProvider>
      <Create {...props} modal />
    </UIContextProvider>
  ),
};

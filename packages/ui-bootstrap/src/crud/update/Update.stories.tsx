import "../../../stories/config";

import { action } from "storybook/actions";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "react-bootstrap/Button";
import { string } from "yup";

import { FormField } from "../../form/FormField";
import { UIContextProvider } from "../../UI";
import { Update } from "./Update";

const meta: Meta<typeof Update> = {
  title: "UI Bootstrap/Components/Crud/Update",
  component: Update,
};

export default meta;

interface IFormValues {
  test: string;
}
type Story = StoryObj<typeof Update<IFormValues>>;

export const BasicUpdate: Story = {
  args: {
    form: {
      title: "Update form",
      onSubmit: async (values: IFormValues) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        action("Form submit")(values);
        return values;
      },
      successMessage: "Update succeed",
      onSuccess: action("Form submit succeed"),
      validationSchema: { test: string().required("Test is required") },
      initialValues: { test: "test value" },
      children: <FormField name="test" autoFocus placeholder="Basic form input" />,
    },
  },
  render: (props) => (
    <UIContextProvider>
      <Update {...props} />
    </UIContextProvider>
  ),
};

export const UpdateInModal: Story = {
  args: {
    form: {
      title: "Update form",
      onSubmit: async (values: IFormValues) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        action("Form submit")(values);
        return values;
      },
      successMessage: "Update succeed",
      onSuccess: action("Form submit succeed"),
      validationSchema: { test: string().required("Test is required") },
      initialValues: { test: "test value" },
      children: <FormField name="test" autoFocus placeholder="Basic form input" />,
    },
  },
  render: (props) => (
    <UIContextProvider>
      <Update {...props} modal>
        <Button>Open update form in modal</Button>
      </Update>
    </UIContextProvider>
  ),
};

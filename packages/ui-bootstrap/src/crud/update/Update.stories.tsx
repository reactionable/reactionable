import "../../../stories/config";

import { action } from "@storybook/addon-actions";
import { ReactElement } from "react";
import Button from "react-bootstrap/Button";
import { string } from "yup";

import { FormField } from "../../form/FormField";
import { UIContextProvider } from "../../UI";
import { Update } from "./Update";

export default {
  title: "UI Bootstrap/Components/Crud/Update",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Update },
};

interface IFormValues {
  test: string;
}

export const BasicUpdate = (): ReactElement => (
  <UIContextProvider>
    <Update
      form={{
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
      }}
    />
  </UIContextProvider>
);

export const UpdateInModal = (): ReactElement => (
  <UIContextProvider>
    <Update
      modal
      form={{
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
      }}
    >
      <Button>Open update form in modal</Button>
    </Update>
  </UIContextProvider>
);

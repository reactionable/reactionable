import Button from "@material-ui/core/Button/Button";
import { action } from "@storybook/addon-actions";
import React, { ReactElement } from "react";
import { string } from "yup";

import { Create } from "./Create";
import { FormField } from "../../form/FormField";
import { UIContextProvider } from "../../UI";

export default {
  title: "UI Material/Components/Crud/Create",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Create },
};

interface IFormValues {
  test: string;
}

export const BasicCreate = (): ReactElement => (
  <UIContextProvider>
    <Create
      form={{
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
      }}
    />
  </UIContextProvider>
);

export const CreateInModal = (): ReactElement => (
  <UIContextProvider>
    <Create
      modal
      form={{
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
      }}
    >
      <Button>Open create form in modal</Button>
    </Create>
  </UIContextProvider>
);

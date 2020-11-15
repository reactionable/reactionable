import Button from "@material-ui/core/Button/Button";
import { action } from "@storybook/addon-actions";
import React, { ReactElement } from "react";
import { string } from "yup";

import { Update } from "../../../src/crud/update/Update";
import { FormField } from "../../../src/form/FormField";
import { UIContextProvider } from "../../../src/UI";

export default {
  title: "UI Material/Components/Crud/Update",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Update },
};

interface IFormValues {
  test: string;
}

export const SimpleUpdate = (): ReactElement => (
  <UIContextProvider>
    <Update
      form={{
        title: "Update form",
        submitButton: true,
        onSubmit: async (values: IFormValues) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          action("Form submit")(values);
          return values;
        },
        onSuccess: action("Form submit succeed"),
        validationSchema: { test: string().required("Test is required") },
        initialValues: { test: "test value" },
        children: <FormField name="test" autoFocus placeholder="Simple form input" />,
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
        submitButton: true,
        onSubmit: async (values: IFormValues) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          action("Form submit")(values);
          return values;
        },
        onSuccess: action("Form submit succeed"),
        validationSchema: { test: string().required("Test is required") },
        initialValues: { test: "test value" },
        children: <FormField name="test" autoFocus placeholder="Simple form input" />,
      }}
    >
      <Button>Open update form in modal</Button>
    </Update>
  </UIContextProvider>
);

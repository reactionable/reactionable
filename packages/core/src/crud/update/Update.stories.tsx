import { action } from "@storybook/addon-actions";
import { ReactElement } from "react";
import { string } from "yup";

import { FormField } from "../../form/FormField";
import { UIContextProvider, useUIProviderProps } from "../../ui/UI";
import { Update } from "./Update";

export default {
  title: "Core/Components/Crud/Update",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Update },
};

interface IFormValues {
  test: string;
}

export const BasicUpdate = (): ReactElement => {
  return (
    <UIContextProvider {...useUIProviderProps()}>
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
};

export const UpdateInModal = (): ReactElement => {
  return (
    <UIContextProvider {...useUIProviderProps()}>
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
        <button>Open update form in modal</button>
      </Update>
    </UIContextProvider>
  );
};

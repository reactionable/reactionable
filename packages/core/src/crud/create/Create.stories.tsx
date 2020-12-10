import { action } from "@storybook/addon-actions";
import { ReactElement } from "react";
import { string } from "yup";

import { FormField } from "../../form/FormField";
import { UIContextProvider, useUIProviderProps } from "../../ui/UI";
import { Create } from "./Create";

export default {
  title: "Core/Components/Crud/Create",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Create },
};

interface IFormValues {
  test: string;
}

export const BasicCreate = (): ReactElement => {
  return (
    <UIContextProvider {...useUIProviderProps()}>
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
};

export const CreateInModal = (): ReactElement => {
  return (
    <UIContextProvider {...useUIProviderProps()}>
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
        <button>Open create form in modal</button>
      </Create>
    </UIContextProvider>
  );
};

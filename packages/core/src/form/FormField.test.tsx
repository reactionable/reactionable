import { render } from "@testing-library/react";
import React from "react";
import { string } from "yup";

import { FormField } from "../form/FormField";
import { i18nTestInstance } from "../tests/I18n";
import { TestWrapper } from "../tests/TestWrapper";
import { Form } from "./Form";

const formProps = {
  title: "Basic form",
  initialValues: { test: "" },
  onSubmit: async (values: { test: string }) => {
    return values;
  },
  validationSchema: { test: string().required("Test is required") },
};

describe("FormField", () => {
  beforeAll(i18nTestInstance);

  it("should render without crashing", () => {
    const result = render(
      <TestWrapper>
        <Form {...formProps}>
          <FormField label="Test" name="test" autoFocus placeholder="Basic form input" />
        </Form>
      </TestWrapper>
    );

    expect(result).toBeTruthy();
  });
});

import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";
import React from "react";
import { string } from "yup";

import { i18nTestInstance } from "../tests/I18n";
import { Form } from "./Form";
import { FormField } from "./FormField";

const formProps = {
  title: "Simple form",
  initialValues: { test: "" },
  onSubmit: jest.fn(),
  validationSchema: { test: string().required("Test is required") },
  children: <FormField name="test" />,
};

describe("Form", () => {
  beforeAll(i18nTestInstance);

  it("should render without crashing", () => {
    const result = render(<Form {...formProps} />);

    expect(result).toBeTruthy();
  });

  it("should set custom className", () => {
    const { getByTestId } = render(
      <Form {...formProps} form={{ className: "test-class", "data-testid": "test-form" }} />
    );
    expect(getByTestId("test-form")).toHaveClass("test-class");
  });
});

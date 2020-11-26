import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { FormWithCheckbox, FormWithSelect, FormWithTextArea, BasicForm } from "./Form.stories";
import { Form } from "./Form";
import { FormField } from "./FormField";
import { string } from "yup";
import { i18nTestInstance } from "../tests/I18n";

describe("Form", () => {
  beforeAll(i18nTestInstance);

  describe("BasicForm", () => {
    it("should render without crashing", () => {
      const result = render(<BasicForm />);

      expect(result).toBeTruthy();
    });
  });

  describe("FormWithTextArea", () => {
    it("should render without crashing", () => {
      const result = render(<FormWithTextArea />);

      expect(result).toBeTruthy();
    });
  });

  describe("FormWithSelect", () => {
    it("should render without crashing", () => {
      const result = render(<FormWithSelect />);

      expect(result).toBeTruthy();
    });
  });

  describe("FormWithCheckbox", () => {
    it("should render without crashing", () => {
      const result = render(<FormWithCheckbox />);

      expect(result).toBeTruthy();
    });
  });

  it("should set custom className", () => {
    const formProps = {
      title: "Basic form",
      initialValues: { test: "" },
      onSubmit: jest.fn(),
      validationSchema: { test: string().required("Test is required") },
      children: <FormField name="test" />,
    };

    const { getByTestId } = render(
      <Form {...formProps} form={{ className: "test-class", "data-testid": "test-form" }} />
    );
    expect(getByTestId("test-form")).toHaveClass("test-class");
  });
});

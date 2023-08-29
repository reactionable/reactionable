import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import { string } from "yup";

import { i18nTestInstance } from "../testing/I18n";
import { Form } from "./Form";
import {
  BasicForm,
  FormSubmitError,
  FormWithCheckbox,
  FormWithFileAndPreview,
  FormWithLabelledInput,
  FormWithSelect,
  FormWithTextArea,
} from "./Form.stories";
import { FormField } from "./FormField";

describe("Form", () => {
  beforeAll(i18nTestInstance);

  describe("BasicForm", () => {
    it("should render without crashing", () => {
      const result = render(<BasicForm />);

      expect(result).toBeTruthy();
    });
  });

  describe("FormWithLabelledInput", () => {
    it("should render without crashing", () => {
      const result = render(<FormWithLabelledInput />);

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

  describe("FormWithFileAndPreview", () => {
    it("should render without crashing", () => {
      const result = render(<FormWithFileAndPreview />);

      expect(result).toBeTruthy();
    });
  });

  describe("FormSubmitError", () => {
    it("should render without crashing", () => {
      const result = render(<FormSubmitError />);

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

import { i18nTestInstance } from "@reactionable/core/lib/testing/I18n";
import { render } from "@testing-library/react";
import { string } from "yup";

import { FormField } from "../form/FormField";
import { TestWrapper } from "../testing/TestWrapper";
import { Form } from "./Form";

const formProps = {
  title: "Basic form",
  initialValues: { test: "" },
  onSubmit: jest.fn(),
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

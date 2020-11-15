import { i18nTestInstance } from "@reactionable/core/lib/tests/I18n";
import { render } from "@testing-library/react";
import React from "react";
import { string } from "yup";

import { FormField } from "../form/FormField";
import { TestWrapper } from "../tests/TestWrapper";
import { ModalForm } from "./ModalForm";

describe("ModalForm", () => {
  beforeAll(i18nTestInstance);

  it("should render without crashing", () => {
    const result = render(
      <TestWrapper>
        <ModalForm
          submitButton="Submit modal form"
          closeModal={jest.fn()}
          onSubmit={jest.fn()}
          validationSchema={{
            test: string().required("Test is required"),
          }}
          initialValues={{
            test: "",
          }}
        >
          <FormField name="test" />
        </ModalForm>
      </TestWrapper>
    );
    expect(result).toBeTruthy();
  });
});

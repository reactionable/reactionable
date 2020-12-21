import { i18nTestInstance } from "@reactionable/core/lib/testing/I18n";
import { render } from "@testing-library/react";
import { string } from "yup";

import { FormField } from "../form/FormField";
import { TestWrapper } from "../testing/TestWrapper";
import { ModalForm } from "./ModalForm";

describe("ModalForm", () => {
  beforeAll(i18nTestInstance);

  it("should render without crashing", () => {
    const closeModal = jest.fn();
    const onSubmit = jest.fn();

    const result = render(
      <TestWrapper>
        <ModalForm
          submitButton="Submit modal form"
          closeModal={closeModal}
          onSubmit={onSubmit}
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

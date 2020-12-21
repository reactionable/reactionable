import { i18nTestInstance } from "@reactionable/core/lib/testing/I18n";
import { renderHook } from "@testing-library/react-hooks";
import { string } from "yup";

import { FormField } from "../form/FormField";
import { useModalForm } from "./useModalForm";

describe("useModalForm", () => {
  beforeAll(i18nTestInstance);

  it("should render without crashing", () => {
    const onHide = jest.fn();
    const onSubmit = jest.fn();
    const onSuccess = jest.fn();

    const { result } = renderHook(() =>
      useModalForm({
        onHide,
        title: "Modal with form",
        form: {
          FormButton: "Submit form",
          onSubmit,
          onSuccess,
          validationSchema: { test: string().required("Test is required") },
          initialValues: { test: "" },
          children: <FormField name="test" autoFocus placeholder="Basic form input" />,
        },
      })
    );

    expect(result.current.modal).not.toBeNull();
  });
});

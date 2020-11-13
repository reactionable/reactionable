import { render } from "@testing-library/react";
import React from "react";
import { string } from "yup";

import { FormField } from "../../form/FormField";
import { i18nTestInstance } from "../../tests/I18n";
import { TestWrapper } from "../../tests/TestWrapper";
import { Update } from "./Update";

interface ITestValues {
  test: string;
}

interface ITestData {
  test: string;
}

describe("Update", () => {
  beforeAll(i18nTestInstance);

  it("should render without crashing", () => {
    const result = render(
      <TestWrapper>
        <Update<ITestValues, ITestData>
          form={{
            onSuccess: (data) => {
              data;
            },
            title: "Update a new test",
            onSubmit: async (values) => values,
            initialValues: {
              test: "",
            },
            validationSchema: {
              test: string().required("Test is required"),
            },
            children: <FormField name="test" />,
          }}
        />
      </TestWrapper>
    );

    expect(result).toBeTruthy();
  });

  it("should renders inside a modal without crashing", () => {
    const result = render(
      <TestWrapper>
        <Update<ITestValues, ITestData>
          modal
          form={{
            onSuccess: jest.fn(),
            title: "Update a new test",
            onSubmit: async (values) => values,
            initialValues: {
              test: "",
            },
            validationSchema: {
              test: string().required("Test is required"),
            },
            children: <FormField name="test" />,
          }}
        />
      </TestWrapper>
    );

    expect(result).toBeTruthy();
  });
});

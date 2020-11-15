import { i18nTestInstance } from "@reactionable/core/lib/tests/I18n";
import { render } from "@testing-library/react";
import React from "react";

import { TestWrapper } from "../../tests/TestWrapper";
import { Delete } from "./Delete";

interface ITestData {
  test: string;
}

describe("Delete", () => {
  beforeAll(i18nTestInstance);

  it("should render without crashing", () => {
    const result = render(
      <TestWrapper>
        <Delete<ITestData>
          title="Test delete"
          confirmationMessage="Test confirm success message"
          successMessage="Test delete success message"
          onConfirm={jest.fn()}
        />
      </TestWrapper>
    );

    expect(result).toBeTruthy();
  });
});

import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../tests/I18n";
import { TestWrapper } from "../../tests/TestWrapper";
import { Suspense } from "./Suspense";

describe("Suspense", () => {
  beforeAll(i18nTestInstance);

  it("should render without crashing", () => {
    const result = render(
      <TestWrapper>
        <Suspense />
      </TestWrapper>
    );
    expect(result).toBeTruthy();
  });
});

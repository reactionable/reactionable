import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../testing/I18n";
import { TestWrapper } from "../../testing/TestWrapper";
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

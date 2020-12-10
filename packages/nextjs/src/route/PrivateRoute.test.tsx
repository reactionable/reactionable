import { i18nTestInstance } from "@reactionable/core";
import { render } from "@testing-library/react";

import { TestWrapper } from "../tests/TestWrapper";
import { PrivateRoute } from "./PrivateRoute";

describe("PrivateRoute", () => {
  beforeAll(i18nTestInstance);

  it("should render without crashing", () => {
    const result = render(
      <TestWrapper>
        <PrivateRoute />
      </TestWrapper>
    );
    expect(result).toBeTruthy();
  });
});

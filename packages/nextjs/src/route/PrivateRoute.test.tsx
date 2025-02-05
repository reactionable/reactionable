import { i18nTestInstance } from "@reactionable/core";
import { render } from "@testing-library/react";

import { TestWrapper } from "../testing/TestWrapper";
import { PrivateRoute } from "./PrivateRoute";

// eslint-disable-next-line @typescript-eslint/no-require-imports
jest.mock("next/router", () => require("next-router-mock"));

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

import { render } from "@testing-library/react";
import React from "react";

import { TestWrapper } from "../tests/TestWrapper";
import { RouterLink } from "./RouterLink";

describe("RouterLink", () => {
  it("should render without crashing", () => {
    const result = render(
      <TestWrapper>
        <RouterLink href="test">Test</RouterLink>
      </TestWrapper>
    );

    expect(result).toBeTruthy();
  });
});

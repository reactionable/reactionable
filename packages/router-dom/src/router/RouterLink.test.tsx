import { render } from "@testing-library/react";
import React from "react";

import { TestWrapper } from "../tests/TestWrapper";
import { RouterLink } from "./RouterLink";

describe("RouterLink", () => {
  it("should render without crashing", () => {
    const result = render(
      <TestWrapper>
        <RouterLink href="test">
          <a>Test</a>
        </RouterLink>
      </TestWrapper>
    );

    expect(result).toBeTruthy();
  });
});

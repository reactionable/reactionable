import { render } from "@testing-library/react";
import React from "react";

import { ErrorAlert } from "./ErrorAlert";

describe("ErrorAlert", () => {
  it("should render without crashing", () => {
    const result = render(<ErrorAlert />);
    expect(result).toBeTruthy();
  });
});

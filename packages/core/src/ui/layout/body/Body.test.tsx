import { render } from "@testing-library/react";
import React from "react";

import { Body } from "./Body";

it("should render without crashing", () => {
  const result = render(<Body />);
  expect(result).toBeTruthy();
});

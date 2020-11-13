import { render } from "@testing-library/react";
import React from "react";

import { i18nTestInstance } from "../../../tests/I18n";
import { Header } from "./Header";

describe("Header", () => {
  beforeAll(i18nTestInstance);
  it("should render without crashing", () => {
    const result = render(<Header />);
    expect(result).toBeTruthy();
  });
});

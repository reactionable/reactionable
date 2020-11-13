import { render } from "@testing-library/react";
import React from "react";

import { i18nTestInstance } from "../../../tests/I18n";
import { Footer } from "./Footer";

describe("Footer", () => {
  beforeAll(i18nTestInstance);
  it("should render without crashing", () => {
    const result = render(<Footer />);
    expect(result).toBeTruthy();
  });
});

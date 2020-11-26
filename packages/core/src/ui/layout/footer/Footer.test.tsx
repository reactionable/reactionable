import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { BasicFooter } from "./Footer.stories";
import { i18nTestInstance } from "../../../tests/I18n";

describe("Footer", () => {
  beforeAll(i18nTestInstance);

  describe("BasicFooter", () => {
    it("should render without crashing", () => {
      const result = render(<BasicFooter />);

      expect(result).toBeTruthy();
    });
  });
});

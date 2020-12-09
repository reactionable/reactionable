import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";
import React from "react";

import { i18nTestInstance } from "../tests/I18n";
import { UseIdentityContext } from "./Identity.stories";

describe("Identity", () => {
  beforeAll(i18nTestInstance);

  describe("UseIdentityContext", () => {
    it("should render without crashing", () => {
      const result = render(<UseIdentityContext />);

      expect(result).toBeTruthy();
    });
  });
});

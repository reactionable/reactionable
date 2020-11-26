import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { BasicConfirmationAction } from "./Confirmation.stories";
import { i18nTestInstance } from "../../tests/I18n";

describe("Confirmation", () => {
  beforeAll(i18nTestInstance);

  describe("BasicConfirmationAction", () => {
    it("should render without crashing", () => {
      const result = render(<BasicConfirmationAction />);

      expect(result).toBeTruthy();
    });
  });
});

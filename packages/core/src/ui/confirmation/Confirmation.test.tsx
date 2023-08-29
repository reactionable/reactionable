import "@testing-library/jest-dom";

import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../testing/I18n";
import { BasicConfirmationAction } from "./Confirmation.stories";

describe("Confirmation", () => {
  beforeAll(i18nTestInstance);

  describe("BasicConfirmationAction", () => {
    it("should render without crashing", () => {
      const result = render(<BasicConfirmationAction />);

      expect(result).toBeTruthy();
    });
  });
});

import "@testing-library/jest-dom";

import { render, fireEvent } from "@testing-library/react";

import { i18nTestInstance } from "../../testing/I18n";
import { BasicConfirmationAction } from "./Confirmation.stories";

describe("Confirmation", () => {
  beforeAll(i18nTestInstance);

  describe("BasicConfirmationAction", () => {
    it("should render without crashing", () => {
      const result = render(<BasicConfirmationAction />);

      expect(result).toBeTruthy();
    });

    it("should open dialog on button click", () => {
      const result = render(<BasicConfirmationAction />);

      expect(result).toBeTruthy();

      const button = result.getByRole("button");
      expect(button).toBeTruthy();

      fireEvent.click(button);

      const dialog = result.getByText("Do you want to perform this action");
      expect(dialog).toBeVisible();
    });
  });
});

import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { render, fireEvent } from "@testing-library/react";

import { i18nTestInstance } from "../../testing/I18n";
import * as stories from "./Confirmation.stories";
const { BasicConfirmation, UseConfirmation, BasicConfirmationAction } = composeStories(stories);

describe("Confirmation", () => {
  beforeAll(i18nTestInstance);

  describe("BasicConfirmation", () => {
    it("should render without crashing", () => {
      const result = render(<BasicConfirmation />);

      expect(result).toBeTruthy();
    });
  });

  describe("UseConfirmation", () => {
    it("should render without crashing", () => {
      const result = render(<UseConfirmation />);

      expect(result).toBeTruthy();
    });
  });

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

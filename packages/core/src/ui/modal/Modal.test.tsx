import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import * as stories from "./Modal.stories";
import { i18nTestInstance } from "../../testing/I18n";

const { BasicModal, UseModalHook, ModalWithForm, UseModalFormHook } = composeStories(stories);

describe("Modal", () => {
  beforeAll(i18nTestInstance);

  describe("BasicModal", () => {
    it("should render without crashing", () => {
      const result = render(<BasicModal />);

      expect(result).toBeTruthy();
    });
  });

  describe("UseModalHook", () => {
    it("should render without crashing", () => {
      const result = render(<UseModalHook />);

      expect(result).toBeTruthy();
    });
  });

  describe("ModalWithForm", () => {
    it("should render without crashing", () => {
      const result = render(<ModalWithForm />);

      expect(result).toBeTruthy();
    });
  });

  describe("UseModalFormHook", () => {
    it("should render without crashing", () => {
      const result = render(<UseModalFormHook />);

      expect(result).toBeTruthy();
    });
  });
});

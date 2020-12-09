import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { BasicModal, ModalWithForm, UseModalFormHook, UseModalHook } from "./Modal.stories";
import { i18nTestInstance } from "@reactionable/core/lib/tests/I18n";

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

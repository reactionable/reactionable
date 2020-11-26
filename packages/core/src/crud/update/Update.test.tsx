import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { BasicUpdate, UpdateInModal } from "./Update.stories";
import { i18nTestInstance } from "../../tests/I18n";

describe("Update", () => {
  beforeAll(i18nTestInstance);

  describe("BasicUpdate", () => {
    it("should render without crashing", () => {
      const result = render(<BasicUpdate />);

      expect(result).toBeTruthy();
    });
  });

  describe("UpdateInModal", () => {
    it("should render without crashing", () => {
      const result = render(<UpdateInModal />);

      expect(result).toBeTruthy();
    });
  });
});

import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { BasicDelete } from "./Delete.stories";
import { i18nTestInstance } from "../../tests/I18n";

describe("Delete", () => {
  beforeAll(i18nTestInstance);

  describe("BasicDelete", () => {
    it("should render without crashing", () => {
      const result = render(<BasicDelete />);

      expect(result).toBeTruthy();
    });
  });
});

import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { BasicRead } from "./Read.stories";
import { i18nTestInstance } from "../../tests/I18n";

describe("Read", () => {
  beforeAll(i18nTestInstance);

  describe("BasicRead", () => {
    it("should render without crashing", () => {
      const result = render(<BasicRead />);

      expect(result).toBeTruthy();
    });
  });
});

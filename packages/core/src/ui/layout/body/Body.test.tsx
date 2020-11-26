import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { BasicBody } from "./Body.stories";
import { i18nTestInstance } from "../../../tests/I18n";

describe("Body", () => {
  beforeAll(i18nTestInstance);

  describe("BasicBody", () => {
    it("should render without crashing", () => {
      const result = render(<BasicBody />);

      expect(result).toBeTruthy();
    });
  });
});

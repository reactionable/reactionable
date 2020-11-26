import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { BasicApp } from "./App.stories";
import { i18nTestInstance } from "../tests/I18n";

describe("App", () => {
  beforeAll(i18nTestInstance);

  describe("BasicApp", () => {
    it("should render without crashing", () => {
      const result = render(<BasicApp />);

      expect(result).toBeTruthy();
    });
  });
});

import "@testing-library/jest-dom/extend-expect";

import { i18nTestInstance } from "@reactionable/core";
import { render } from "@testing-library/react";
import React from "react";

import { BasicApp } from "./App.stories";

describe("App", () => {
  beforeAll(i18nTestInstance);

  describe("BasicApp", () => {
    it("should render without crashing", () => {
      const result = render(<BasicApp />);

      expect(result).toBeTruthy();
    });
  });
});

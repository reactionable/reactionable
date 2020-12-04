import "@testing-library/jest-dom/extend-expect";

import { i18nTestInstance } from "@reactionable/core";
import { render } from "@testing-library/react";
import React from "react";

import { BasicBody } from "./Body.stories";

describe("Body", () => {
  beforeAll(i18nTestInstance);

  describe("BasicBody", () => {
    it("should render without crashing", () => {
      const result = render(<BasicBody />);

      expect(result).toBeTruthy();
    });
  });
});

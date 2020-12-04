import "@testing-library/jest-dom/extend-expect";

import { i18nTestInstance } from "@reactionable/core";
import { render } from "@testing-library/react";
import React from "react";

import { BasicHeader } from "./Header.stories";

describe("Header", () => {
  beforeAll(i18nTestInstance);

  describe("BasicHeader", () => {
    it("should render without crashing", () => {
      const result = render(<BasicHeader />);

      expect(result).toBeTruthy();
    });
  });
});

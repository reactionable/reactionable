import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { BasicHeader } from "./Header.stories";
import { i18nTestInstance } from "../../../tests/I18n";

describe("Header", () => {
  beforeAll(i18nTestInstance);

  describe("BasicHeader", () => {
    it("should render without crashing", () => {
      const result = render(<BasicHeader />);

      expect(result).toBeTruthy();
    });
  });
});

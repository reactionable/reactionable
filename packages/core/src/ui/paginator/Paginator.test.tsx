import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { BasicPaginator } from "./Paginator.stories";
import { i18nTestInstance } from "../../tests/I18n";

describe("Paginator", () => {
  beforeAll(i18nTestInstance);

  describe("BasicPaginator", () => {
    it("should render without crashing", () => {
      const result = render(<BasicPaginator />);

      expect(result).toBeTruthy();
    });
  });
});

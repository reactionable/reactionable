import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../tests/I18n";
import { BasicLayout, LayoutWithFooter, LayoutWithHeader, UseLayout } from "./Layout.stories";

describe("Layout", () => {
  beforeAll(i18nTestInstance);

  describe("BasicLayout", () => {
    it("should render without crashing", () => {
      const result = render(<BasicLayout />);

      expect(result).toBeTruthy();
    });
  });

  describe("LayoutWithFooter", () => {
    it("should render without crashing", () => {
      const result = render(<LayoutWithFooter />);

      expect(result).toBeTruthy();
    });
  });

  describe("LayoutWithHeader", () => {
    it("should render without crashing", () => {
      const result = render(<LayoutWithHeader />);

      expect(result).toBeTruthy();
    });
  });

  describe("UseLayout", () => {
    it("should render without crashing", () => {
      const result = render(<UseLayout />);

      expect(result).toBeTruthy();
    });
  });
});

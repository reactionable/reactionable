import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";

import { i18nTestInstance } from "../tests/I18n";
import { AppWithChildren, AppWithRoutes, BasicApp } from "./App.stories";

describe("App", () => {
  beforeAll(i18nTestInstance);

  describe("BasicApp", () => {
    it("should render without crashing", () => {
      const result = render(<BasicApp />);

      expect(result).toBeTruthy();
    });
  });

  describe("AppWithRoutes", () => {
    it("should render without crashing", () => {
      const result = render(<AppWithRoutes />);

      expect(result).toBeTruthy();
    });
  });

  describe("AppWithChildren", () => {
    it("should render without crashing", () => {
      const result = render(<AppWithChildren />);

      expect(result).toBeTruthy();
    });
  });
});

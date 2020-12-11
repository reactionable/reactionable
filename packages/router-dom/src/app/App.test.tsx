import "@testing-library/jest-dom/extend-expect";

import { i18nTestInstance } from "@reactionable/core/lib/tests/I18n";
import { render } from "@testing-library/react";

import { AppWithHomeComponent, AppWithNotFoundComponent, AppWithRoutes } from "./App.stories";

describe("App", () => {
  beforeAll(i18nTestInstance);

  describe("AppWithHomeComponent", () => {
    it("should render without crashing", () => {
      const result = render(<AppWithHomeComponent />);

      expect(result).toBeTruthy();
    });
  });

  describe("AppWithNotFoundComponent", () => {
    it("should render without crashing", () => {
      const result = render(<AppWithNotFoundComponent />);

      expect(result).toBeTruthy();
    });
  });

  describe("AppWithRoutes", () => {
    it("should render without crashing", () => {
      const result = render(<AppWithRoutes />);

      expect(result).toBeTruthy();
    });
  });
});

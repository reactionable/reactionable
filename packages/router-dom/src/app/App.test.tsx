import "@testing-library/jest-dom/extend-expect";

import { i18nTestInstance } from "@reactionable/core/lib/tests/I18n";
import { render } from "@testing-library/react";

import { AppWithCustomRoutes, BasicApp } from "./App.stories";

describe("App", () => {
  beforeAll(i18nTestInstance);

  describe("BasicApp", () => {
    it("should render without crashing", () => {
      const result = render(<BasicApp />);

      expect(result).toBeTruthy();
    });
  });

  describe("AppWithCustomRoutes", () => {
    it("should render without crashing", () => {
      const result = render(<AppWithCustomRoutes />);

      expect(result).toBeTruthy();
    });
  });
});

import "@testing-library/jest-dom/extend-expect";

import { i18nTestInstance } from "@reactionable/core/lib/testing/I18n";
import { render } from "@testing-library/react";

import { AppWithProviders } from "./App.stories";

describe("App", () => {
  beforeAll(i18nTestInstance);

  describe("AppWithProviders", () => {
    it("should render without crashing", () => {
      const result = render(<AppWithProviders />);

      expect(result).toBeTruthy();
    });
  });
});

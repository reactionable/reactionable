import "@testing-library/jest-dom/extend-expect";

import { i18nTestInstance } from "@reactionable/core/lib/tests/I18n";
import { render } from "@testing-library/react";

import { BasicRouterContextProvider, UseRouter } from "./Router.stories";

describe("Router", () => {
  beforeAll(i18nTestInstance);

  describe("BasicRouterContextProvider", () => {
    it("should render without crashing", () => {
      const result = render(<BasicRouterContextProvider />);

      expect(result).toBeTruthy();
    });
  });

  describe("UseRouter", () => {
    it("should render without crashing", () => {
      const result = render(<UseRouter />);

      expect(result).toBeTruthy();
    });
  });
});

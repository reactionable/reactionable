import "@testing-library/jest-dom/extend-expect";

import { i18nTestInstance } from "@reactionable/core/lib/tests/I18n";
import { render } from "@testing-library/react";

import { BasicRouterContextProvider, BasicRouterLink } from "./Router.stories";

describe("Router", () => {
  beforeAll(i18nTestInstance);

  describe("BasicRouterContextProvider", () => {
    it("should render without crashing", () => {
      const result = render(<BasicRouterContextProvider />);

      expect(result).toBeTruthy();
    });
  });

  describe("BasicRouterLink", () => {
    it("should render without crashing", () => {
      const result = render(<BasicRouterLink />);

      expect(result).toBeTruthy();
    });
  });
});
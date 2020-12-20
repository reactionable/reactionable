import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";

import { i18nTestInstance } from "../tests/I18n";
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

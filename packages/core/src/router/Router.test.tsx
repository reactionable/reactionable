import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { BasicRouterContextProvider, BasicLink } from "./Router.stories";
import { i18nTestInstance } from "../tests/I18n";

describe("Router", () => {
  beforeAll(i18nTestInstance);

  describe("BasicRouterContextProvider", () => {
    it("should render without crashing", () => {
      const result = render(<BasicRouterContextProvider />);

      expect(result).toBeTruthy();
    });
  });

  describe("BasicLink", () => {
    it("should render without crashing", () => {
      const result = render(<BasicLink />);

      expect(result).toBeTruthy();
    });
  });
});

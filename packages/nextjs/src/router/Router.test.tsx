import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { i18nTestInstance } from "@reactionable/core";
import { render } from "@testing-library/react";

import * as stories from "./Router.stories";
const { BasicRouterContextProvider, UseRouter } = composeStories(stories);

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

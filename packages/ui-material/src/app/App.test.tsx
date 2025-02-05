import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { i18nTestInstance } from "@reactionable/core";
import { render } from "@testing-library/react";

import * as stories from "./App.stories";
const { AppWithProviders } = composeStories(stories);

describe("App", () => {
  beforeAll(i18nTestInstance);

  describe("AppWithProviders", () => {
    it("should render without crashing", () => {
      const result = render(<AppWithProviders />);

      expect(result).toBeTruthy();
    });
  });
});

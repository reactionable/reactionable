import { render } from "@testing-library/react";

import { composeStories } from "@storybook/react";
import { i18nTestInstance } from "@reactionable/core";
import * as stories from "./Loader.stories";

const { BasicLoader, UseLoader } = composeStories(stories);

describe("Loader", () => {
  beforeAll(i18nTestInstance);

  describe("BasicLoader", () => {
    it("should render without crashing", () => {
      const result = render(<BasicLoader />);

      expect(result).toBeTruthy();
    });
  });

  describe("UseLoader", () => {
    it("should render without crashing", () => {
      const result = render(<UseLoader />);

      expect(result).toBeTruthy();
    });
  });
});

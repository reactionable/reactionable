import { i18nTestInstance } from "@reactionable/core";
import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";

import * as stories from "./LanguageSelector.stories";

const { BasicLanguageSelector } = composeStories(stories);

describe("LanguageSelector", () => {
  beforeAll(i18nTestInstance);

  describe("BasicLanguageSelector", () => {
    it("should render without crashing", () => {
      const result = render(<BasicLanguageSelector />);
      expect(result).toBeTruthy();
    });
  });
});

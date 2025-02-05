import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { i18nTestInstance } from "@reactionable/core";
import { render } from "@testing-library/react";
import * as stories from "./Footer.stories";

const { BasicFooter } = composeStories(stories);

describe("Footer", () => {
  beforeAll(i18nTestInstance);

  describe("BasicFooter", () => {
    it("should render without crashing", () => {
      const result = render(<BasicFooter />);

      expect(result).toBeTruthy();
    });
  });
});

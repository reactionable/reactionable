import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { i18nTestInstance } from "@reactionable/core";
import { render } from "@testing-library/react";
import * as stories from "./Body.stories";

const { BasicBody } = composeStories(stories);

describe("Body", () => {
  beforeAll(i18nTestInstance);

  describe("BasicBody", () => {
    it("should render without crashing", () => {
      const result = render(<BasicBody />);

      expect(result).toBeTruthy();
    });
  });
});

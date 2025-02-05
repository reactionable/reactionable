import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { i18nTestInstance } from "@reactionable/core";
import { render } from "@testing-library/react";
import * as stories from "./ButtonLink.stories";

const { BasicButtonLink } = composeStories(stories);

describe("ButtonLink", () => {
  beforeAll(i18nTestInstance);

  describe("BasicButtonLink", () => {
    it("should render without crashing", () => {
      const result = render(<BasicButtonLink />);

      expect(result).toBeTruthy();
    });
  });
});

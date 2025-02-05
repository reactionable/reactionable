import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { i18nTestInstance } from "@reactionable/core";
import { render } from "@testing-library/react";
import * as stories from "./Icon.stories";

const { BasicIcon, IconWithComponentAsProp } = composeStories(stories);

describe("Icon", () => {
  beforeAll(i18nTestInstance);

  describe("BasicIcon", () => {
    it("should render without crashing", () => {
      const result = render(<BasicIcon />);

      expect(result).toBeTruthy();
    });
  });

  describe("IconWithComponentAsProp", () => {
    it("should render without crashing", () => {
      const result = render(<IconWithComponentAsProp />);

      expect(result).toBeTruthy();
    });
  });
});

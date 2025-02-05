import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../../testing/I18n";
import * as stories from "./NotFound.stories";

const { BasicNotFound } = composeStories(stories);

describe("NotFound", () => {
  beforeAll(i18nTestInstance);

  describe("BasicNotFound", () => {
    it("should render without crashing", () => {
      const result = render(<BasicNotFound />);

      expect(result).toBeTruthy();
    });
  });
});

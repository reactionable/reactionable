import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { composeStories } from "@storybook/react";

import { i18nTestInstance } from "../../testing/I18n";

import * as stories from "./Delete.stories";
const { BasicDelete } = composeStories(stories);

describe("Delete", () => {
  beforeAll(i18nTestInstance);

  describe("BasicDelete", () => {
    it("should render without crashing", () => {
      const result = render(<BasicDelete />);

      expect(result).toBeTruthy();
    });
  });
});

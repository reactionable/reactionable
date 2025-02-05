import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../testing/I18n";
import * as stories from "./List.stories";
const { BasicList } = composeStories(stories);

describe("List", () => {
  beforeAll(i18nTestInstance);

  describe("BasicList", () => {
    it("should render without crashing", () => {
      const result = render(<BasicList />);

      expect(result).toBeTruthy();
    });
  });
});

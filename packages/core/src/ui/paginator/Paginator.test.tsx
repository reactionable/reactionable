import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../testing/I18n";
import * as stories from "./Paginator.stories";

const { BasicPaginator } = composeStories(stories);

describe("Paginator", () => {
  beforeAll(i18nTestInstance);

  describe("BasicPaginator", () => {
    it("should render without crashing", () => {
      const result = render(<BasicPaginator />);

      expect(result).toBeTruthy();
    });
  });
});

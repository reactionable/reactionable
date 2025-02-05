import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../testing/I18n";
import * as stories from "./ListTable.stories";
const { BasicListTable } = composeStories(stories);

describe("ListTable", () => {
  beforeAll(i18nTestInstance);

  describe("BasicListTable", () => {
    it("should render without crashing", () => {
      const result = render(<BasicListTable />);

      expect(result).toBeTruthy();
    });
  });
});

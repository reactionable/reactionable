import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import { composeStories } from "@storybook/react";

import { i18nTestInstance } from "../../testing/I18n";
import * as stories from "./Update.stories";
const { BasicUpdate, UpdateInModal } = composeStories(stories);

describe("Update", () => {
  beforeAll(i18nTestInstance);

  describe("BasicUpdate", () => {
    it("should render without crashing", () => {
      const result = render(<BasicUpdate />);

      expect(result).toBeTruthy();
    });
  });

  describe("UpdateInModal", () => {
    it("should render without crashing", () => {
      const result = render(<UpdateInModal />);

      expect(result).toBeTruthy();
    });
  });
});

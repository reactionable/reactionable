import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { i18nTestInstance } from "@reactionable/core";
import { render } from "@testing-library/react";
import * as stories from "./Create.stories";

const { BasicCreate, CreateInModal } = composeStories(stories);

describe("Create", () => {
  beforeAll(i18nTestInstance);

  describe("BasicCreate", () => {
    it("should render without crashing", () => {
      const result = render(<BasicCreate />);

      expect(result).toBeTruthy();
    });
  });

  describe("CreateInModal", () => {
    it("should render without crashing", () => {
      const result = render(<CreateInModal />);

      expect(result).toBeTruthy();
    });
  });
});

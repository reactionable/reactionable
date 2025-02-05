import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { i18nTestInstance } from "@reactionable/core";
import { render } from "@testing-library/react";
import * as stories from "./NavItem.stories";

const { BasicNavItem, NavItemWithIcon } = composeStories(stories);

describe("NavItem", () => {
  beforeAll(i18nTestInstance);

  describe("BasicNavItem", () => {
    it("should render without crashing", () => {
      const result = render(<BasicNavItem />);

      expect(result).toBeTruthy();
    });
  });

  describe("NavItemWithIcon", () => {
    it("should render without crashing", () => {
      const result = render(<NavItemWithIcon />);

      expect(result).toBeTruthy();
    });
  });
});

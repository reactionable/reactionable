import { composeStories } from "@storybook/react";
import { i18nTestInstance } from "@reactionable/core";
import { render } from "@testing-library/react";

import * as stories from "./RouterLink.stories";
const {
  BasicRouterLink,
  BasicLinkInRouterLink,
  RouterLinkCustomComponentInRouterLink,
  RouterLinkCustomComponent,
} = composeStories(stories);

describe("RouterLink", () => {
  beforeAll(i18nTestInstance);

  describe("BasicRouterLink", () => {
    it("should render without crashing", () => {
      const result = render(<BasicRouterLink />);

      expect(result).toBeTruthy();
    });
  });

  describe("BasicLinkInRouterLink", () => {
    it("should render without crashing", () => {
      const result = render(<BasicLinkInRouterLink />);

      expect(result).toBeTruthy();
    });
  });

  describe("RouterLinkCustomComponentInRouterLink", () => {
    it("should render without crashing", () => {
      const result = render(<RouterLinkCustomComponentInRouterLink />);

      expect(result).toBeTruthy();
    });
  });

  describe("RouterLinkCustomComponent", () => {
    it("should render without crashing", () => {
      const result = render(<RouterLinkCustomComponent />);

      expect(result).toBeTruthy();
    });
  });
});

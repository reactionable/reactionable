import { i18nTestInstance } from "@reactionable/core/lib/tests/I18n";
import { render } from "@testing-library/react";

import {
  BasicLinkInRouterLink,
  BasicRouterLink,
  RouterLinkCustomComponentInRouterLink,
} from "./RouterLink.stories";

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
});

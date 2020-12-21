import "@testing-library/jest-dom/extend-expect";

import { i18nTestInstance } from "@reactionable/core/lib/testing/I18n";
import { render } from "@testing-library/react";

import { BasicNavItem, NavItemWithIcon } from "./NavItem.stories";

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

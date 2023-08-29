import "@testing-library/jest-dom";

import { i18nTestInstance } from "@reactionable/core/lib/testing/I18n";
import { render } from "@testing-library/react";

import { BasicNavItem } from "./NavItem.stories";

describe("NavItem", () => {
  beforeAll(i18nTestInstance);

  describe("BasicNavItem", () => {
    it("should render without crashing", () => {
      const result = render(<BasicNavItem />);

      expect(result).toBeTruthy();
    });
  });
});

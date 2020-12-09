import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { BasicNavItem } from "./NavItem.stories";
import { i18nTestInstance } from "@reactionable/core/lib/tests/I18n";

describe("NavItem", () => {
  beforeAll(i18nTestInstance);

  describe("BasicNavItem", () => {
    it("should render without crashing", () => {
      const result = render(<BasicNavItem />);

      expect(result).toBeTruthy();
    });
  });
});

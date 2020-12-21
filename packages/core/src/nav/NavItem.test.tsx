import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";

import { i18nTestInstance } from "../testing/I18n";
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

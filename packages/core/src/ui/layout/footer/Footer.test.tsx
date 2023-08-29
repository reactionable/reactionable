import "@testing-library/jest-dom";

import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../../testing/I18n";
import { BasicFooter } from "./Footer.stories";

describe("Footer", () => {
  beforeAll(i18nTestInstance);

  describe("BasicFooter", () => {
    it("should render without crashing", () => {
      const result = render(<BasicFooter />);

      expect(result).toBeTruthy();
    });
  });
});

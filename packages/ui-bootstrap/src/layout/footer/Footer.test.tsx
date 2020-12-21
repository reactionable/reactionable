import "@testing-library/jest-dom/extend-expect";

import { i18nTestInstance } from "@reactionable/core/lib/testing/I18n";
import { render } from "@testing-library/react";

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

import "@testing-library/jest-dom";

import { i18nTestInstance } from "@reactionable/core/lib/testing/I18n";
import { render } from "@testing-library/react";

import { BasicBody } from "./Body.stories";

describe("Body", () => {
  beforeAll(i18nTestInstance);

  describe("BasicBody", () => {
    it("should render without crashing", () => {
      const result = render(<BasicBody />);

      expect(result).toBeTruthy();
    });
  });
});

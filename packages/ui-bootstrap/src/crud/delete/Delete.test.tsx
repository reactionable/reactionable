import "@testing-library/jest-dom";

import { i18nTestInstance } from "@reactionable/core/lib/testing/I18n";
import { render } from "@testing-library/react";

import { BasicDelete } from "./Delete.stories";

describe("Delete", () => {
  beforeAll(i18nTestInstance);

  describe("BasicDelete", () => {
    it("should render without crashing", () => {
      const result = render(<BasicDelete />);

      expect(result).toBeTruthy();
    });
  });
});

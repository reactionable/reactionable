import "@testing-library/jest-dom/extend-expect";

import { i18nTestInstance } from "@reactionable/core";
import { render } from "@testing-library/react";

import { BasicRead } from "./Read.stories";

describe("Read", () => {
  beforeAll(i18nTestInstance);

  describe("BasicRead", () => {
    it("should render without crashing", () => {
      const result = render(<BasicRead />);

      expect(result).toBeTruthy();
    });
  });
});

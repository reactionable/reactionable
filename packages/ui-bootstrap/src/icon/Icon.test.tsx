import "@testing-library/jest-dom/extend-expect";

import { i18nTestInstance } from "@reactionable/core";
import { render } from "@testing-library/react";

import { BasicIcon } from "./Icon.stories";

describe("Icon", () => {
  beforeAll(i18nTestInstance);

  describe("BasicIcon", () => {
    it("should render without crashing", () => {
      const result = render(<BasicIcon />);

      expect(result).toBeTruthy();
    });
  });
});

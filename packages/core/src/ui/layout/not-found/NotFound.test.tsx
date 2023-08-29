import "@testing-library/jest-dom";

import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../../testing/I18n";
import { BasicNotFound } from "./NotFound.stories";

describe("NotFound", () => {
  beforeAll(i18nTestInstance);

  describe("BasicNotFound", () => {
    it("should render without crashing", () => {
      const result = render(<BasicNotFound />);

      expect(result).toBeTruthy();
    });
  });
});

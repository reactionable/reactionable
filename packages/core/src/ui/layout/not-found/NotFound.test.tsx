import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../../tests/I18n";
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

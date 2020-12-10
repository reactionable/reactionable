import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../tests/I18n";
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

import "@testing-library/jest-dom";

import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../testing/I18n";
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

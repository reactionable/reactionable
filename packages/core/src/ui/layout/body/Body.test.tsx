import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../../testing/I18n";
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

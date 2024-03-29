import "@testing-library/jest-dom";

import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../testing/I18n";
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

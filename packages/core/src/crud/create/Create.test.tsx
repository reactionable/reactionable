import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../tests/I18n";
import { BasicCreate, CreateInModal } from "./Create.stories";

describe("Create", () => {
  beforeAll(i18nTestInstance);

  describe("BasicCreate", () => {
    it("should render without crashing", () => {
      const result = render(<BasicCreate />);

      expect(result).toBeTruthy();
    });
  });

  describe("CreateInModal", () => {
    it("should render without crashing", () => {
      const result = render(<CreateInModal />);

      expect(result).toBeTruthy();
    });
  });
});

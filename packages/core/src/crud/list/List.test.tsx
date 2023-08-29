import "@testing-library/jest-dom";

import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../testing/I18n";
import { BasicList, BasicListTable } from "./List.stories";

describe("List", () => {
  beforeAll(i18nTestInstance);

  describe("BasicList", () => {
    it("should render without crashing", () => {
      const result = render(<BasicList />);

      expect(result).toBeTruthy();
    });
  });

  describe("BasicListTable", () => {
    it("should render without crashing", () => {
      const result = render(<BasicListTable />);

      expect(result).toBeTruthy();
    });
  });
});

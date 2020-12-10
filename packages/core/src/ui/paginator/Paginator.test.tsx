import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../tests/I18n";
import { BasicPaginator } from "./Paginator.stories";

describe("Paginator", () => {
  beforeAll(i18nTestInstance);

  describe("BasicPaginator", () => {
    it("should render without crashing", () => {
      const result = render(<BasicPaginator />);

      expect(result).toBeTruthy();
    });
  });
});

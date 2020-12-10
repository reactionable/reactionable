import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../../tests/I18n";
import { NotFound } from "./NotFound";

describe("NotFound", () => {
  beforeAll(i18nTestInstance);
  it("should render without crashing", () => {
    const result = render(<NotFound />);
    expect(result).toBeTruthy();
  });
});

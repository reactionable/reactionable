import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../tests/I18n";
import { Loader } from "./Loader";

describe("Loader", () => {
  beforeAll(i18nTestInstance);

  it("should render without crashing", () => {
    const result = render(<Loader />);

    expect(result).toBeTruthy();
  });
});

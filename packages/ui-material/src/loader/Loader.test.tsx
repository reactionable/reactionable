import { i18nTestInstance } from "@reactionable/core/lib/testing/I18n";
import { render } from "@testing-library/react";

import { Loader } from "./Loader";

describe("Loader", () => {
  beforeAll(i18nTestInstance);
  it("should render without crashing", () => {
    const result = render(<Loader />);
    expect(result).toBeTruthy();
  });
});

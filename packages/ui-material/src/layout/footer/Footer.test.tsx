import { i18nTestInstance } from "@reactionable/core/lib/tests/I18n";
import { render } from "@testing-library/react";

import { Footer } from "./Footer";

describe("Footer", () => {
  beforeAll(i18nTestInstance);
  it("should render without crashing", () => {
    const result = render(<Footer />);
    expect(result).toBeTruthy();
  });
});

import { i18nTestInstance } from "@reactionable/core/src/tests/I18n";
import { render } from "@testing-library/react";

import { LanguageSelector } from "./LanguageSelector";

describe("LanguageSelector", () => {
  beforeAll(i18nTestInstance);

  it("should render without crashing", () => {
    const result = render(<LanguageSelector />);
    expect(result).toBeTruthy();
  });
});

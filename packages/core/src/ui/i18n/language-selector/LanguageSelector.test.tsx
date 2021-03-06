import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../../testing/I18n";
import { LanguageSelector } from "./LanguageSelector";

describe("LanguageSelector", () => {
  beforeAll(i18nTestInstance);

  it("should render without crashing", () => {
    const result = render(<LanguageSelector />);
    expect(result).toBeTruthy();
  });
});

import { i18nTestInstance } from "@reactionable/core/lib/testing/I18n";
import { render } from "@testing-library/react";

import { UserHeaderNav } from "./UserHeaderNav";

describe("UserHeaderNav", () => {
  beforeAll(i18nTestInstance);
  it("should render without crashing", () => {
    const result = render(<UserHeaderNav />);
    expect(result).toBeTruthy();
  });
});

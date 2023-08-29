import "@testing-library/jest-dom";

import { i18nTestInstance } from "@reactionable/core/lib/testing/I18n";
import { render } from "@testing-library/react";

import { BasicHeader, HeaderWithIdentity } from "./Header.stories";

describe("Header", () => {
  beforeAll(i18nTestInstance);

  describe("BasicHeader", () => {
    it("should render without crashing", () => {
      const result = render(<BasicHeader />);

      expect(result).toBeTruthy();
    });
  });

  describe("HeaderWithIdentity", () => {
    it("should render without crashing when no user is logged in", () => {
      const result = render(<HeaderWithIdentity />);

      expect(result).toBeTruthy();
    });

    it("should render without crashing when a user is logged in", () => {
      const result = render(<HeaderWithIdentity defaultUserIsLoggedIn />);

      expect(result).toBeTruthy();
    });
  });
});

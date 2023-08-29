import "@testing-library/jest-dom";

import { i18nTestInstance } from "@reactionable/core/lib/testing/I18n";
import { render } from "@testing-library/react";

import { UseIdentityContext } from "./Identity.stories";

describe("Identity", () => {
  beforeAll(i18nTestInstance);

  describe("UseIdentityContext", () => {
    it("should render without crashing", async () => {
      const { findByText } = render(<UseIdentityContext />);

      expect(await findByText("Sign in to your account")).toBeInTheDocument();
      expect(await findByText("Create account")).toBeInTheDocument();
    });
  });
});

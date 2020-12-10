import "@testing-library/jest-dom/extend-expect";

import { i18nTestInstance } from "@reactionable/core";
import { render } from "@testing-library/react";

import { HideSignUpForm, UseIdentityContext } from "./Identity.stories";

describe("Identity", () => {
  beforeAll(i18nTestInstance);

  describe("UseIdentityContext", () => {
    it("should render without crashing", async () => {
      const { findByText } = render(<UseIdentityContext />);

      expect(await findByText("Sign in to your account")).toBeInTheDocument();
      expect(await findByText("Create account")).toBeInTheDocument();
    });
  });

  describe("HideSignUpForm", () => {
    it("should render without crashing", async () => {
      const { findByText, queryByText } = render(<HideSignUpForm />);

      expect(await findByText("Sign in to your account")).toBeInTheDocument();
      expect(await queryByText("Create account")).toBeNull();
    });
  });
});

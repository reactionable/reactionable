import "@testing-library/jest-dom/extend-expect";

import { i18nTestInstance } from "@reactionable/core";
import { render } from "@testing-library/react";
import React from "react";

import { HideSignUpForm, UseIdentityContext } from "./Identity.stories";

describe("Identity", () => {
  beforeAll(i18nTestInstance);

  describe("UseIdentityContext", () => {
    it("should render without crashing", () => {
      const result = render(<UseIdentityContext />);

      expect(result).toBeTruthy();
    });
  });

  describe("HideSignUpForm", () => {
    it("should render without crashing", () => {
      const result = render(<HideSignUpForm />);

      expect(result).toBeTruthy();
    });
  });
});

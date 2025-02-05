import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";

import { i18nTestInstance } from "../testing/I18n";
import * as stories from "./Identity.stories";

const { BasicAuth, UseIdentityContext, AuthSubmitError } = composeStories(stories);

describe("Identity", () => {
  beforeAll(i18nTestInstance);

  describe("UseIdentityContext", () => {
    it("should render without crashing", () => {
      const result = render(<UseIdentityContext />);

      expect(result).toBeTruthy();
    });
  });

  describe("BasicAuth", () => {
    it("should render without crashing", () => {
      const result = render(<BasicAuth />);

      expect(result).toBeTruthy();
    });
  });

  describe("AuthSubmitError", () => {
    it("should render without crashing", () => {
      const result = render(<AuthSubmitError />);

      expect(result).toBeTruthy();
    });
  });
});

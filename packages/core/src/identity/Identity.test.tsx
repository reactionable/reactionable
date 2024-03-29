import "@testing-library/jest-dom";

import { render } from "@testing-library/react";

import { i18nTestInstance } from "../testing/I18n";
import { BasicAuth, UseIdentityContext } from "./Identity.stories";

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
});

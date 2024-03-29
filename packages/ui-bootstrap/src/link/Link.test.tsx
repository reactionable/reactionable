import "@testing-library/jest-dom";

import { i18nTestInstance } from "@reactionable/core/lib/testing/I18n";
import { render } from "@testing-library/react";

import { BasicButtonLink, BasicLink, UseLink } from "./Link.stories";

describe("Link", () => {
  beforeAll(i18nTestInstance);

  describe("BasicLink", () => {
    it("should render without crashing", () => {
      const result = render(<BasicLink />);

      expect(result).toBeTruthy();
    });
  });

  describe("BasicButtonLink", () => {
    it("should render without crashing", () => {
      const result = render(<BasicButtonLink />);

      expect(result).toBeTruthy();
    });
  });

  describe("UseLink", () => {
    it("should render without crashing", () => {
      const result = render(<UseLink />);

      expect(result).toBeTruthy();
    });
  });
});

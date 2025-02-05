import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../testing/I18n";
import * as stories from "./Link.stories";

const { BasicLink, UseLink } = composeStories(stories);

describe("Link", () => {
  beforeAll(i18nTestInstance);

  describe("BasicLink", () => {
    it("should render without crashing", () => {
      const result = render(<BasicLink />);

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

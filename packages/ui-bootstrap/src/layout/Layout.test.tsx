import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { i18nTestInstance } from "@reactionable/core";
import { render } from "@testing-library/react";
import * as stories from "./Layout.stories";

const { BasicLayout, LayoutWithFooter, LayoutWithHeader, LayoutWithHeaderAndFooter, UseLayout } =
  composeStories(stories);

describe("Layout", () => {
  beforeAll(i18nTestInstance);

  describe("BasicLayout", () => {
    it("should render without crashing", () => {
      const result = render(<BasicLayout />);

      expect(result).toBeTruthy();
    });
  });

  describe("LayoutWithFooter", () => {
    it("should render without crashing", () => {
      const result = render(<LayoutWithFooter />);

      expect(result).toBeTruthy();
    });
  });

  describe("LayoutWithHeader", () => {
    it("should render without crashing", () => {
      const result = render(<LayoutWithHeader />);

      expect(result).toBeTruthy();
    });
  });

  describe("LayoutWithHeaderAndFooter", () => {
    it("should render without crashing", () => {
      const result = render(<LayoutWithHeaderAndFooter />);

      expect(result).toBeTruthy();
    });
  });

  describe("UseLayout", () => {
    it("should render without crashing", () => {
      const result = render(<UseLayout />);

      expect(result).toBeTruthy();
    });
  });
});

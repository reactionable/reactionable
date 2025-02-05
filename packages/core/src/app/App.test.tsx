import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import { composeStories } from "@storybook/react";

import { i18nTestInstance } from "../testing/I18n";
import * as stories from "./App.stories";
const { AppWithChildren, AppWithProviders, BasicApp } = composeStories(stories);

describe("App", () => {
  beforeAll(i18nTestInstance);

  describe("BasicApp", () => {
    it("should render without crashing", () => {
      const result = render(<BasicApp />);

      expect(result).toBeTruthy();
    });
  });

  describe("AppWithChildren", () => {
    it("should render without crashing", () => {
      const result = render(<AppWithChildren />);

      expect(result).toBeTruthy();
    });
  });

  describe("AppWithProviders", () => {
    it("should render without crashing", () => {
      const result = render(<AppWithProviders />);

      expect(result).toBeTruthy();
    });
  });
});

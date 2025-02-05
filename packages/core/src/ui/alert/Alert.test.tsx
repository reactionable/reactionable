import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../testing/I18n";
import * as stories from "./Alert.stories";

const { BasicAlert, BasicErrorAlert, BasicWarningAlert, UseAlert, UseErrorAlert, UseWarningAlert } =
  composeStories(stories);

describe("Alert", () => {
  beforeAll(i18nTestInstance);

  describe("BasicAlert", () => {
    it("should render without crashing", () => {
      const result = render(<BasicAlert />);

      expect(result).toBeTruthy();
    });
  });

  describe("BasicErrorAlert", () => {
    it("should render without crashing", () => {
      const result = render(<BasicErrorAlert />);

      expect(result).toBeTruthy();
    });
  });

  describe("BasicWarningAlert", () => {
    it("should render without crashing", () => {
      const result = render(<BasicWarningAlert />);

      expect(result).toBeTruthy();
    });
  });

  describe("UseAlert", () => {
    it("should render without crashing", () => {
      const result = render(<UseAlert />);

      expect(result).toBeTruthy();
    });
  });

  describe("UseErrorAlert", () => {
    it("should render without crashing", () => {
      const result = render(<UseErrorAlert />);

      expect(result).toBeTruthy();
    });
  });

  describe("UseWarningAlert", () => {
    it("should render without crashing", () => {
      const result = render(<UseWarningAlert />);

      expect(result).toBeTruthy();
    });
  });
});

import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../testing/I18n";
import * as stories from "./Notification.stories";

const {
  BasicNotification,
  NotificationWithComplexContent,
  UseNotification,
  BasicErrorNotification,
  UseErrorNotification,
  BasicSuccessNotification,
  UseSuccessNotification,
} = composeStories(stories);

describe("Notification", () => {
  beforeAll(i18nTestInstance);

  describe("BasicNotification", () => {
    it("should render without crashing", () => {
      const result = render(<BasicNotification />);

      expect(result).toBeTruthy();
    });
  });

  describe("NotificationWithComplexContent", () => {
    it("should render without crashing", () => {
      const result = render(<NotificationWithComplexContent />);

      expect(result).toBeTruthy();
    });
  });

  describe("UseNotification", () => {
    it("should render without crashing", () => {
      const result = render(<UseNotification />);

      expect(result).toBeTruthy();
    });
  });

  describe("BasicErrorNotification", () => {
    it("should render without crashing", () => {
      const result = render(<BasicErrorNotification />);

      expect(result).toBeTruthy();
    });
  });

  describe("UseErrorNotification", () => {
    it("should render without crashing", () => {
      const result = render(<UseErrorNotification />);

      expect(result).toBeTruthy();
    });
  });

  describe("BasicSuccessNotification", () => {
    it("should render without crashing", () => {
      const result = render(<BasicSuccessNotification />);

      expect(result).toBeTruthy();
    });
  });

  describe("UseSuccessNotification", () => {
    it("should render without crashing", () => {
      const result = render(<UseSuccessNotification />);

      expect(result).toBeTruthy();
    });
  });
});

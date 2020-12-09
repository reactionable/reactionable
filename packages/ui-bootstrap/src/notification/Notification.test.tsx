import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import {
  BasicErrorNotification,
  BasicNotification,
  BasicSuccessNotification,
  NotificationWithComplexContent,
  UseErrorNotification,
  UseNotification,
  UseSuccessNotification,
} from "./Notification.stories";
import { i18nTestInstance } from "@reactionable/core/lib/tests/I18n";

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
});

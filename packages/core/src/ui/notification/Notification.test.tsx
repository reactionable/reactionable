import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { BasicNotification, NotificationWithComplexContent } from "./Notification.stories";
import { i18nTestInstance } from "../../tests/I18n";

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
});

import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../testing/I18n";
import { BasicNotification, NotificationWithComplexContent } from "./Notification.stories";

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

import "@testing-library/jest-dom";

import { i18nTestInstance } from "@reactionable/core/lib/testing/I18n";
import { render } from "@testing-library/react";

import { BasicUpdate, UpdateInModal } from "./Update.stories";

describe("Update", () => {
  beforeAll(i18nTestInstance);

  describe("BasicUpdate", () => {
    it("should render without crashing", () => {
      const result = render(<BasicUpdate />);

      expect(result).toBeTruthy();
    });
  });

  describe("UpdateInModal", () => {
    it("should render without crashing", () => {
      const result = render(<UpdateInModal />);

      expect(result).toBeTruthy();
    });
  });
});

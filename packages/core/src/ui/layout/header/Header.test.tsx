import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";

import { i18nTestInstance } from "../../../testing/I18n";
import * as stories from "./Header.stories";

const { BasicHeader, HeaderWithIdentity } = composeStories(stories);

describe("Header", () => {
  beforeAll(i18nTestInstance);

  describe("BasicHeader", () => {
    it("should render without crashing", () => {
      const result = render(<BasicHeader />);

      expect(result).toBeTruthy();
    });
  });

  describe("HeaderWithIdentity", () => {
    it("should render without crashing when no user is logged in", () => {
      const result = render(<HeaderWithIdentity />);

      expect(result).toBeTruthy();
    });

    it("should render without crashing when a user is logged in", () => {
      const result = render(
        <HeaderWithIdentity
          user={{
            id: "test-user-id",
            username: "Test user",
            attributes: { email: "test@test.com" },
          }}
        />
      );

      expect(result).toBeTruthy();
    });
  });
});

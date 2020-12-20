import { render } from "@testing-library/react";

import { i18nTestInstance } from "../tests/I18n";
import { generatePath } from "./RouterLink";
import {
  BasicLinkInRouterLink,
  BasicRouterLink,
  RouterLinkCustomComponentInRouterLink,
} from "./RouterLink.stories";

describe("RouterLink", () => {
  beforeAll(i18nTestInstance);

  describe("BasicRouterLink", () => {
    it("should render without crashing", () => {
      const result = render(<BasicRouterLink />);

      expect(result).toBeTruthy();
    });
  });

  describe("BasicLinkInRouterLink", () => {
    it("should render without crashing", () => {
      const result = render(<BasicLinkInRouterLink />);

      expect(result).toBeTruthy();
    });
  });

  describe("RouterLinkCustomComponentInRouterLink", () => {
    it("should render without crashing", () => {
      const result = render(<RouterLinkCustomComponentInRouterLink />);

      expect(result).toBeTruthy();
    });
  });

  describe("generatePath", () => {
    it("generate absolute path with duplicated separators", () => {
      for (const path of ["/", "/", "/test/..", "/test/../", "//test//..//"]) {
        const value = generatePath(path);
        expect(value).toBe("/");
      }
    });

    it("generate absolute path with parent directory pattern", () => {
      for (const path of [
        "/test/:id/child/:childId/sub-child/..",
        "/test//:id/child//:childId/sub-child/..",
      ]) {
        const value = generatePath(path, { id: "1" }, { childId: "2" });
        expect(value).toBe("/test/1/child/2");
      }
    });

    it("generate relative path with parent directory pattern", () => {
      for (const path of [
        "test/:id/child/:childId/sub-child/..",
        "test//:id/child//:childId/sub-child/..",
      ]) {
        const value = generatePath(path, { id: "1" }, { childId: "2" });
        expect(value).toBe("test/1/child/2");
      }
    });
  });
});

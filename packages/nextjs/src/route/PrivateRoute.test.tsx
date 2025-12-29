import { i18nTestInstance } from "@reactionable/core";
import { render } from "@testing-library/react";
import Router from "next/router";

import { TestWrapper } from "../testing/TestWrapper";
import { PrivateRoute } from "./PrivateRoute";

describe("PrivateRoute", () => {
  let pushSpy: jest.SpyInstance;

  beforeAll(i18nTestInstance);
  beforeEach(() => {
    pushSpy = jest.spyOn(Router, "push").mockResolvedValue(true);
  });
  afterEach(() => {
    pushSpy.mockRestore();
  });

  it("should render without crashing", () => {
    const result = render(
      <TestWrapper>
        <PrivateRoute />
      </TestWrapper>
    );
    expect(result).toBeTruthy();
  });
});

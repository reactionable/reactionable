import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BasicQueryWrapper } from "./QueryWrapper.stories";
import { i18nTestInstance } from "../tests/I18n";
import { QueryWrapper } from "./QueryWrapper";

describe("QueryWrapper", () => {
  beforeAll(i18nTestInstance);

  describe("BasicQueryWrapper", () => {
    it("should render without crashing", () => {
      const result = render(<BasicQueryWrapper />);

      expect(result).toBeTruthy();
    });
  });

  it("should render render children only when data is defined", async () => {
    const children = jest.fn();

    const data = "test";

    render(
      <QueryWrapper loading={false} data={data}>
        {children}
      </QueryWrapper>
    );

    expect(children).toHaveBeenCalledWith({
      data,
      loading: false,
      setErrorAlert: expect.any(Function),
      setLoading: expect.any(Function),
      setWarningAlert: expect.any(Function),
    });
  });
});

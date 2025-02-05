import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";

import { i18nTestInstance } from "../testing/I18n";
import { QueryWrapper } from "./QueryWrapper";
import * as stories from "./QueryWrapper.stories";

const { BasicQueryWrapper } = composeStories(stories);

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

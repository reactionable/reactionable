import { composeStories } from "@storybook/react";
import { i18nTestInstance } from "@reactionable/core";
import { render } from "@testing-library/react";
import { Paginator } from "./Paginator";
import * as stories from "./Paginator.stories";

const { BasicPaginator } = composeStories(stories);

describe("Paginator", () => {
  beforeAll(i18nTestInstance);

  describe("BasicPaginator", () => {
    it("should render without crashing", () => {
      const result = render(<BasicPaginator />);

      expect(result).toBeTruthy();
    });
  });

  it("should render without crashing", () => {
    const currentPage = 1;
    const totalCount = 10;
    const perPage = 2;
    const onChange = jest.fn();
    const result = render(
      <Paginator
        currentPage={currentPage}
        totalCount={totalCount}
        perPage={perPage}
        onChange={onChange}
      />
    );

    expect(result).toBeTruthy();
  });
});

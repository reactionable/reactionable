import { i18nTestInstance } from "@reactionable/core/lib/tests/I18n";
import { render } from "@testing-library/react";

import { Paginator } from "./Paginator";

describe("Paginator", () => {
  beforeAll(i18nTestInstance);

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

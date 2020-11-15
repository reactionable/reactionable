import Star from "@material-ui/icons/Star";
import { i18nTestInstance } from "@reactionable/core/src/tests/I18n";
import { render } from "@testing-library/react";
import React from "react";

import { Icon } from "./Icon";

describe("Icon", () => {
  beforeAll(i18nTestInstance);

  it("should render with an icon prop", () => {
    const result = render(<Icon icon={Star} />);
    expect(result).toBeTruthy();
  });

  it("should render with an icon prop and color", () => {
    const result = render(<Icon icon={Star} color="secondary" />);
    expect(result).toBeTruthy();
  });

  it("should render with a component as prop", () => {
    const result = render(<Icon {...Star} />);
    expect(result).toBeTruthy();
  });
});

import { render } from "@testing-library/react";
import React from "react";

import { Link } from "./router/Link";

describe("Link", () => {
  it("should render without crashing", async () => {
    const result = render(<Link href="/test">test</Link>);

    expect(result).toBeTruthy();
  });
});

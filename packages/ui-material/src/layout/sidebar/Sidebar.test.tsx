import "@testing-library/jest-dom";

import { i18nTestInstance } from "@reactionable/core/lib/tests/I18n";
import { render } from "@testing-library/react";
import React from "react";

import { Sidebar, useSidebarContext } from "./Sidebar";

describe("Sidebar", () => {
  beforeAll(i18nTestInstance);
  it("should render without crashing", () => {
    const result = render(<Sidebar />);
    expect(result).toBeTruthy();
  });

  it("should display nav items", () => {
    const SidebarChildren = () => {
      const { setNavItems } = useSidebarContext();
      setNavItems([{ href: "/test", children: "Nav item", "data-testid": "nav-item" }]);

      return <>Children</>;
    };

    const { getByTestId } = render(
      <Sidebar>
        <SidebarChildren />
      </Sidebar>
    );
    expect(getByTestId("nav-item")).toBeVisible();
  });
});

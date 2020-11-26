import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { BasicSidebar } from "./Sidebar.stories";
import { i18nTestInstance } from "../../../tests/I18n";
import { Sidebar, useSidebarContext } from "./Sidebar";

describe("Sidebar", () => {
  beforeAll(i18nTestInstance);

  describe("BasicSidebar", () => {
    it("should render without crashing", () => {
      const result = render(<BasicSidebar />);

      expect(result).toBeTruthy();
    });
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

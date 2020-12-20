import "@testing-library/jest-dom";

import { i18nTestInstance } from "@reactionable/core/lib/tests/I18n";
import { render } from "@testing-library/react";

import { Sidebar, useSidebarContext } from "./Sidebar";
import { BasicSidebar } from "./Sidebar.stories";

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

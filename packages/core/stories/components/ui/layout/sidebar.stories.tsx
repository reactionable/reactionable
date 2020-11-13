import React, { FC, ReactElement } from "react";

import { useTranslation } from "../../../../src/i18n/I18n";
import { generatePath } from "../../../../src/router/Link";
import { useRouteMatch } from "../../../../src/router/Router";
import { Sidebar, useSidebarContext } from "../../../../src/ui/layout/sidebar/Sidebar";
import { UIContextProvider, useUIProviderProps } from "../../../../src/ui/UI";

export default {
  title: "Core/Components/UI/Layout/Sidebar",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Sidebar },
};

const SampleComponent: FC = () => {
  const { t } = useTranslation();
  const match = useRouteMatch();

  const { setNavItems } = useSidebarContext();
  setNavItems([
    {
      href: generatePath(`${match.path}/sample`, match.params),
      children: t("Sample"),
    },
  ]);

  return (
    <div>
      <h1>Hello, world!</h1>
      <p>
        <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.{" "}
        <b>Lorem Ipsum</b> has been the industry&apos; standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of
        Letraset sheets containing <b>Lorem Ipsum</b> passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of <b>Lorem Ipsum</b>
      </p>
      <p>
        <a href="#">Learn more</a>
      </p>
    </div>
  );
};

export const SimpleSidebar = (): ReactElement => (
  <UIContextProvider {...useUIProviderProps()}>
    <Sidebar>
      <SampleComponent />
    </Sidebar>
  </UIContextProvider>
);

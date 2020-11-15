import Button from "@material-ui/core/Button/Button";
import Paper from "@material-ui/core/Paper/Paper";
import SaveIcon from "@material-ui/icons/Save";
import { generatePath, useRouteMatch, useTranslation } from "@reactionable/core";
import React, { FC, ReactElement } from "react";

import { Sidebar, useSidebarContext } from "../../../src/layout/sidebar/Sidebar";
import { UIContextProvider } from "../../../src/UI";

export default {
  title: "UI Material/Components/Layout/Sidebar",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Sidebar },
};

const SampleComponent: FC = () => {
  const { t } = useTranslation();
  const match = useRouteMatch();

  const { setNavItems } = useSidebarContext();

  setNavItems([
    {
      href: generatePath(`${match.path}/sample`, match.params),
      title: t("Go to sample page"),
      icon: SaveIcon,
      children: t("Sample"),
    },
  ]);
  return (
    <Paper elevation={3}>
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
        <Button color="primary">Learn more</Button>
      </p>
    </Paper>
  );
};

export const SimpleSidebar = (): ReactElement => (
  <UIContextProvider>
    <Sidebar>
      <SampleComponent />
    </Sidebar>
  </UIContextProvider>
);

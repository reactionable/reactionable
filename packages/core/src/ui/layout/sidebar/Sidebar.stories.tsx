import type { Meta, StoryObj } from "@storybook/react-vite";
import { FC } from "react";

import { useTranslation } from "../../../i18n/I18n";
import { useRouteMatch } from "../../../router/useRouteMatch";
import { generatePath } from "../../../router/RouterLink";
import { UIContextProvider, useUIProviderProps } from "../../UI";
import { Sidebar, useSidebarContext } from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Core/Components/UI/Layout/Sidebar",
  component: Sidebar,
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

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

export const BasicSidebar: Story = {
  args: {
    children: <SampleComponent />,
  },
  render: (props) => (
    <UIContextProvider {...useUIProviderProps()}>
      <Sidebar {...props} />
    </UIContextProvider>
  ),
};

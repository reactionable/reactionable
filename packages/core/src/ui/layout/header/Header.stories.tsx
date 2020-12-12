import { boolean, withKnobs } from "@storybook/addon-knobs";
import { ReactElement } from "react";

import {
  IdentityContextProvider,
  useIdentityContext,
  useIdentityProviderProps,
} from "../../../identity/Identity";
import { Header } from "./Header";

export default {
  title: "Core/Components/UI/Layout/Header",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Header },
  decorators: [withKnobs],
};

export const BasicHeader = (): ReactElement => {
  const user = boolean("Logged in user", false);
  const { setUser } = useIdentityContext();

  setUser(user ? { username: "User" } : null);

  return (
    <IdentityContextProvider {...useIdentityProviderProps()}>
      <Header brand="Test brand header" navItems={[{ href: "/sample", children: "Sample link" }]} />
    </IdentityContextProvider>
  );
};

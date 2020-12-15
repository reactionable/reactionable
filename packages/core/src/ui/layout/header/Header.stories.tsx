import { boolean, withKnobs } from "@storybook/addon-knobs";
import { ReactElement, useEffect } from "react";

import { useIdentityContext, withIdentityContext } from "../../../identity/Identity";
import { Header } from "./Header";

export default {
  title: "Core/Components/UI/Layout/Header",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Header },
  decorators: [withKnobs],
};

export const BasicHeader = (): ReactElement => {
  return (
    <Header brand="Test brand header" navItems={[{ href: "/sample", children: "Sample link" }]} />
  );
};

export const HeaderWithIdentity = (): ReactElement => {
  const userIsLoggedIn = boolean("User is logged in", false);

  return withIdentityContext(
    () => {
      const { setUser } = useIdentityContext();

      useEffect(() => {
        setUser(userIsLoggedIn ? { username: "Test user" } : null);
      }, [userIsLoggedIn]);

      return (
        <Header
          brand="Test brand header"
          navItems={[{ href: "/sample", children: "Sample link" }]}
        />
      );
    },
    { identityProvider: "storybook" }
  );
};

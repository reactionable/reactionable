import "../../../stories/config";

import { useIdentityContext, withIdentityContext } from "@reactionable/core/lib/identity/Identity";
import { boolean, select, withKnobs } from "@storybook/addon-knobs";
import { ReactElement, useEffect } from "react";

import { UIContextProvider } from "../../UI";
import { Header } from "./Header";

export default {
  title: "UI Bootstrap/Components/Layout/Header",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Header },
  decorators: [withKnobs],
};

export const BasicHeader = (): ReactElement => {
  const variant = select("Variant", ["dark", "light", undefined], undefined);
  return (
    <Header
      brand="Test brand header"
      variant={variant}
      navItems={[{ href: "/sample", children: "Sample link" }]}
    />
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
        <UIContextProvider>
          <Header
            brand="Test brand header"
            navItems={[{ href: "/sample", children: "Sample link" }]}
          />
        </UIContextProvider>
      );
    },
    { identityProvider: "storybook" }
  );
};

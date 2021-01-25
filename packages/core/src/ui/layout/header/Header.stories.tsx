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

export const HeaderWithIdentity = ({
  defaultUserIsLoggedIn = false,
}: {
  defaultUserIsLoggedIn?: boolean;
}): ReactElement => {
  const userIsLoggedIn = boolean("User is logged in", defaultUserIsLoggedIn);

  const user = { username: "Test user" };

  const useFetchUser = () => ({
    loading: false,
    data: defaultUserIsLoggedIn ? user : null,
    refetch: () => null,
  });

  return withIdentityContext(
    () => {
      const { setUser } = useIdentityContext();

      useEffect(() => {
        setUser(userIsLoggedIn ? user : null);
      }, [userIsLoggedIn]);

      return (
        <Header
          brand="Test brand header"
          navItems={[{ href: "/sample", children: "Sample link" }]}
        />
      );
    },
    {
      identityProvider: "storybook",
      useFetchUser,
    }
  );
};

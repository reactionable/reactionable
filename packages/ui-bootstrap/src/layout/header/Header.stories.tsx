import "../../../stories/config";

import { useIdentityContext, withIdentityContext } from "@reactionable/core/lib/identity/Identity";
import { boolean, select, withKnobs } from "@storybook/addon-knobs";
import { ReactElement, useEffect } from "react";

import { TestWrapper } from "../../testing/TestWrapper";
import { Header } from "./Header";

export default {
  title: "UI Bootstrap/Components/Layout/Header",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Header },
  decorators: [withKnobs],
};

export const BasicHeader = (): ReactElement => {
  const variant = select("Variant", ["dark", "light", undefined], undefined);
  return (
    <TestWrapper>
      <Header
        brand="Test brand header"
        variant={variant}
        navItems={[{ href: "/sample", children: "Sample link" }]}
      />
    </TestWrapper>
  );
};

export const HeaderWithIdentity = ({
  defaultUserIsLoggedIn = false,
}: {
  defaultUserIsLoggedIn?: boolean;
}): ReactElement => {
  const user = { username: "Test user" };

  const userIsLoggedIn = boolean("User is logged in", defaultUserIsLoggedIn);
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

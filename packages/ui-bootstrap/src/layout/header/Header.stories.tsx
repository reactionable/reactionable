import "../../../stories/config";

import {
  IdentityContextProvider,
  useIdentityContext,
  useIdentityProviderProps,
} from "@reactionable/core/lib/identity/Identity";
import { boolean, select, withKnobs } from "@storybook/addon-knobs";
import { ReactElement } from "react";

import { Header } from "./Header";

export default {
  title: "UI Bootstrap/Components/Layout/Header",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Header },
  decorators: [withKnobs],
};

export const BasicHeader = (): ReactElement => {
  const variant = select("Variant", ["dark", "light", undefined], undefined);
  const user = boolean("Logged in user", false);
  const { setUser } = useIdentityContext();

  setUser(user ? { username: "User" } : null);

  return (
    <IdentityContextProvider {...useIdentityProviderProps()}>
      <Header
        brand="Test brand header"
        variant={variant}
        navItems={[{ href: "/sample", children: "Sample link" }]}
      />
    </IdentityContextProvider>
  );
};

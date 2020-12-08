import "@aws-amplify/ui/dist/style.css";

import { useIdentityContext } from "@reactionable/core";
import React, { ReactElement } from "react";

import { IdentityContextProvider } from "./Identity";

export default {
  title: "Core/Components/Identity",
  parameters: { info: { inline: true }, options: { showPanel: true } },
  component: IdentityContextProvider,
};

export const UseIdentityContext = (): ReactElement => {
  const Authentication = () => {
    const { auth, user, displayName } = useIdentityContext();
    return (
      <>
        <p>User signed-in: {user ? displayName() : "No user"}</p>
        {auth}
      </>
    );
  };

  return (
    <IdentityContextProvider {...useIdentityContext()}>
      <Authentication />
    </IdentityContextProvider>
  );
};

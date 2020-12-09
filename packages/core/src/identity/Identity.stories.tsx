import React, { ReactElement } from "react";

import { IdentityContextProvider, useIdentityContext } from "./Identity";

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

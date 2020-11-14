import "../config";

import { useIdentityContext } from "@reactionable/core";
import React, { ReactElement } from "react";

import { IdentityContextProvider, SignUp } from "../../src/identity/Identity";

export default {
  title: "Amplify/Components/Identity",
  parameters: { info: { inline: true }, options: { showPanel: true } },
  component: IdentityContextProvider,
};

export const UseIdentityContext = (): ReactElement => {
  const Authentication = () => {
    const { auth, user } = useIdentityContext();
    return (
      <>
        <p>User signed-in: {user ? user.displayName() : "No user"}</p>
        {auth}
      </>
    );
  };

  return (
    <IdentityContextProvider>
      <Authentication />
    </IdentityContextProvider>
  );
};

export const HideSignUpForm = (): ReactElement => {
  const Authentication = () => {
    const { auth } = useIdentityContext();
    return auth;
  };

  return (
    <IdentityContextProvider hide={[SignUp]}>
      <Authentication />
    </IdentityContextProvider>
  );
};

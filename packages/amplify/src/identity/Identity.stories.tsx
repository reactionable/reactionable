import "@aws-amplify/ui/dist/style.css";

import { useIdentityContext } from "@reactionable/core";
import { ReactElement } from "react";

import { configure } from "../Amplify";
import { IdentityContextProvider, SignUp } from "./Identity";

configure({
  oauth: {},
  userPoolId: "eu-west-1_test-user-pool-id",
  userPoolWebClientId: "test-client-id",
});

export default {
  title: "Amplify/Components/Identity",
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

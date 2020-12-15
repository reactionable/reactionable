import "@aws-amplify/ui/dist/style.css";

import { boolean, withKnobs } from "@storybook/addon-knobs";
import { ReactElement, useEffect } from "react";

import { configure } from "../Amplify";
import { IdentityContextProvider, useIdentityContext, withIdentityContext } from "./Identity";

configure({
  oauth: {},
  userPoolId: "eu-west-1_test-user-pool-id",
  userPoolWebClientId: "test-client-id",
});

export default {
  title: "Amplify/Components/Identity",
  component: IdentityContextProvider,
  decorators: [withKnobs],
};

export const UseIdentityContext = (): ReactElement => {
  const userIsLoggedIn = boolean("User is logged in", false);

  return withIdentityContext(() => {
    const { auth, user, setUser, displayName } = useIdentityContext();

    useEffect(() => {
      setUser(
        userIsLoggedIn
          ? { id: "test-user-id", username: "Test user", attributes: { email: "test@test.com" } }
          : null
      );
    }, [userIsLoggedIn]);

    return user ? (
      <>
        <h3>User signed-in: {displayName()}</h3>
        <pre>
          <code>{JSON.stringify(user, null, 2)}</code>
        </pre>
      </>
    ) : (
      <>
        <h3>No user please login</h3>
        <div>{auth}</div>
      </>
    );
  });
};

import { boolean, withKnobs } from "@storybook/addon-knobs";
import { ReactElement, useEffect } from "react";

import { IdentityContextProvider, useIdentityContext, withIdentityContext } from "./Identity";

export default {
  title: "Core/Components/Identity",
  component: IdentityContextProvider,
  decorators: [withKnobs],
};

export const UseIdentityContext = (): ReactElement => {
  const userIsLoggedIn = boolean("User is logged in", false);

  return withIdentityContext(() => {
    const { auth, user, setUser, displayName } = useIdentityContext();

    useEffect(() => {
      setUser(userIsLoggedIn ? { username: "Test user" } : null);
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

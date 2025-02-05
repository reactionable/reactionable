import "@aws-amplify/ui/dist/style.css";

import type { Meta, StoryObj } from "@storybook/react";

import { ComponentProps, useEffect } from "react";

import { configure } from "../Amplify";
import {
  IdentityContextProvider,
  IUser,
  useIdentityContext,
  withIdentityContext,
} from "./Identity";

const meta: Meta<typeof IdentityContextProvider> = {
  title: "Amplify/Components/Identity",
  component: IdentityContextProvider,
};

configure({
  oauth: {},
  userPoolId: "eu-west-1_testuserpoolid",
  userPoolWebClientId: "test_clientid",
});

export default meta;

type Story = StoryObj<ComponentProps<typeof IdentityContextProvider> & { user: IUser | null }>;

export const UseIdentityContext: Story = {
  argTypes: {
    user: {
      control: {
        type: "boolean",
      },
      mapping: {
        true: { id: "test-user-id", username: "Test user", attributes: { email: "test@test.com" } },
        false: null,
      },
    },
  },
  render: ({ user: userControl }) => {
    return withIdentityContext(() => {
      const { AuthComponent, user, setUser, displayName } = useIdentityContext();

      useEffect(() => {
        setUser(userControl);
      }, [userControl]);

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
          <div>
            <AuthComponent />
          </div>
        </>
      );
    });
  },
};

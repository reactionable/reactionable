import { IUser, useIdentityContext, withIdentityContext } from "@reactionable/core";
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, useEffect } from "react";

import { TestWrapper } from "../../testing/TestWrapper";
import { Header, IHeaderProps } from "./Header";
import { PaletteType } from "@material-ui/core";

const meta: Meta<typeof Header> = {
  title: "UI Material/Components/Layout/Header",
  component: Header,
};

export default meta;

export const BasicHeader: StoryObj<IHeaderProps & { type: PaletteType }> = {
  args: {
    brand: "Test Brand",
    navItems: [{ href: "/sample", children: "Sample link" }],
    color: "default",
    type: "light",
  },
  // FIXME: MUST support type in render
  // render: ({ type, ...props }) => (
  // <TestWrapper ui={{ theme: { palette: { type } } }}>
  render: ({ ...props }) => (
    <TestWrapper ui={{ theme: { palette: { type: "light" } } }}>
      <Header {...props} />
    </TestWrapper>
  ),
};

export const HeaderWithIdentity: StoryObj<ComponentProps<typeof Header> & { user: IUser | null }> =
  {
    args: {
      brand: "Test Brand",
      navItems: [{ href: "/sample", children: "Sample link" }],
    },
    argTypes: {
      user: {
        control: {
          type: "boolean",
        },
        mapping: {
          true: {
            id: "test-user-id",
            username: "Test user",
            attributes: { email: "test@test.com" },
          },
          false: null,
        },
      },
    },
    // FIXME: MUST support user in render
    // render: ({ user, ...props }) => {
    render: ({ ...props }) => {
      const user = null;

      const useFetchUser = () => ({
        loading: false,
        data: user,
        refetch: () => null,
      });

      return withIdentityContext(
        () => {
          const { setUser } = useIdentityContext();

          useEffect(() => {
            setUser(user);
          }, [user]);

          return <Header {...props} />;
        },
        {
          identityProvider: "storybook",
          useFetchUser,
        }
      );
    },
  };

import { IUser, useIdentityContext, withIdentityContext } from "@reactionable/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComponentProps, useEffect } from "react";
import { PaletteMode } from "@mui/material/styles";

import { TestWrapper } from "../../testing/TestWrapper";
import { Header, IHeaderProps } from "./Header";

const meta: Meta<typeof Header> = {
  title: "UI Material/Components/Layout/Header",
  component: Header,
};

export default meta;

export const BasicHeader: StoryObj<IHeaderProps & { mode: PaletteMode }> = {
  args: {
    brand: "Test Brand",
    navItems: [{ href: "/sample", children: "Sample link" }],
    color: "default",
    type: "light",
  },
  render: ({ mode, ...props }) => (
    <TestWrapper ui={{ theme: { palette: { mode } } }}>
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
    render: ({ user, ...props }) => {
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

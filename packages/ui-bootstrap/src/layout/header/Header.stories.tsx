import "../../../stories/config";

import { IUser, useIdentityContext, withIdentityContext } from "@reactionable/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComponentProps, useEffect } from "react";

import { TestWrapper } from "../../testing/TestWrapper";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "UI Bootstrap/Components/Layout/Header",
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const BasicHeader: Story = {
  args: {
    brand: "Test Brand",
    navItems: [{ href: "/sample", children: "Sample link" }],
  },
  render: (props) => (
    <TestWrapper>
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

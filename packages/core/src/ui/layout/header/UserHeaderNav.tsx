import {
  ComponentType,
  ForwardedRef,
  ReactElement,
  MouseEvent as ReactMouseEvent,
  forwardRef,
  useEffect,
} from "react";

import { useTranslation } from "../../../i18n/I18n";
import { useIdentityContext } from "../../../identity/Identity";
import { NavItem } from "../../../nav/NavItem";
import { useRouterContext } from "../../../router/useRouterContext";
import { ILinkProps } from "../../link/Link";
import { useUIContext } from "../../UI";

type IWithNavItemComponentProps<LinkProps extends ILinkProps> = LinkProps & {
  NavItemComponent?: ComponentType<LinkProps>;
};

export type IAccountLinkProps<LinkProps extends ILinkProps> = IWithNavItemComponentProps<LinkProps>;

export const AccountLink = forwardRef(function AccountLink<
  LinkProps extends ILinkProps = ILinkProps
>(
  // eslint-disable-next-line react/prop-types
  { NavItemComponent, onClick, ...props }: IAccountLinkProps<LinkProps>,
  ref: ForwardedRef<HTMLAnchorElement>
): ReactElement {
  const { useLink } = useUIContext();
  const { t } = useTranslation("identity");
  const router = useRouterContext().useRouter();

  const handleClick = (event: ReactMouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (onClick) {
      onClick(event);
    }
    router.push("/account");
  };

  const linkComponentProps = {
    children: t("My account"),
    ...props,
  } as LinkProps;

  return useLink({
    onClick: handleClick,
    Component: NavItemComponent,
    ref,
    ...linkComponentProps,
  });
});

export type ILogoutLinkProps<LinkProps extends ILinkProps> = IWithNavItemComponentProps<LinkProps>;

export function LogoutLink<LinkProps extends ILinkProps = ILinkProps>({
  NavItemComponent = NavItem,
  onClick,
  ...props
}: ILogoutLinkProps<LinkProps>): ReactElement {
  const { logout } = useIdentityContext();
  const { t } = useTranslation("identity");
  const router = useRouterContext().useRouter();
  const { useLoader, useErrorNotification } = useUIContext();
  const { loader, setLoading } = useLoader({ loading: false });
  const { errorNotification, setErrorNotification } = useErrorNotification({
    title: t("Log out"),
  });
  const { useLink } = useUIContext();

  const handleLogout = (event: ReactMouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setLoading(true);
    setErrorNotification(undefined);

    if (onClick) {
      onClick(event);
    }

    logout()
      .then(() => router.push("/"))
      .catch(setErrorNotification)
      .finally(() => setLoading(false));
  };

  const linkComponentProps = {
    children: t("Log out"),
    onClick: handleLogout,
    ...props,
  } as LinkProps;

  const link = useLink({
    Component: NavItemComponent,
    ...linkComponentProps,
  });

  return (
    <>
      {loader}
      {errorNotification}
      {link}
    </>
  );
}

export type IUserLoggedHeaderNavProps<LinkProps extends ILinkProps> = {
  NavItemComponent?: ComponentType<LinkProps>;
};

export function UserLoggedHeaderNav<LinkProps extends ILinkProps = ILinkProps>({
  NavItemComponent = NavItem,
}: IUserLoggedHeaderNavProps<LinkProps>): ReactElement | null {
  const { user, displayName } = useIdentityContext();
  if (!user) {
    return null;
  }

  const withNavItemComponentProps = {
    NavItemComponent: NavItemComponent,
  } as IWithNavItemComponentProps<LinkProps>;

  return (
    <ul title={displayName() || ""}>
      <AccountLink {...(withNavItemComponentProps as ILinkProps)} />
      <LogoutLink<LinkProps> {...withNavItemComponentProps} />
    </ul>
  );
}

export type IUserUnloggedHeaderNavProps<LinkProps extends ILinkProps> = {
  NavItemComponent?: ComponentType<LinkProps>;
};

export function UserUnloggedHeaderNav<LinkProps extends ILinkProps = ILinkProps>({
  NavItemComponent = NavItem,
}: IUserUnloggedHeaderNavProps<LinkProps>): ReactElement | null {
  const { t } = useTranslation();
  const { user, AuthComponent } = useIdentityContext();
  const { useModal } = useUIContext();
  const { useLink } = useUIContext();

  const { modal, openModal } = useModal({
    title: t("Sign In / Sign Up"),
    body: <AuthComponent />,
  });

  useEffect(() => {
    if (user) {
      // closeModal();
    }
  }, [user]);

  if (user) {
    return null;
  }

  const linkComponentProps = {
    children: t("Sign In / Sign Up"),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onClick: (event: ReactMouseEvent<HTMLAnchorElement, MouseEvent>) => openModal(),
  } as LinkProps;

  const link = useLink({
    Component: NavItemComponent,
    ...linkComponentProps,
  });

  return (
    <>
      {modal}
      {link}
    </>
  );
}

export function UserHeaderNav<LinkProps extends ILinkProps = ILinkProps>(): ReactElement | null {
  const { identityProvider } = useIdentityContext();

  if (!identityProvider) {
    return null;
  }

  return (
    <>
      <UserLoggedHeaderNav<LinkProps> />
      <UserUnloggedHeaderNav<LinkProps> />
    </>
  );
}

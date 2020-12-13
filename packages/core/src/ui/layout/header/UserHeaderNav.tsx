import { ComponentType, ReactElement, MouseEvent as ReactMouseEvent, useEffect } from "react";

import { useTranslation } from "../../../i18n/I18n";
import { useIdentityContext } from "../../../identity/Identity";
import { useRouterContext } from "../../../router/Router";
import { ILinkProps } from "../../link/Link";
import { useUIContext } from "../../UI";

type IWithNavItemComponentProps<LinkProps extends ILinkProps> = LinkProps & {
  NavItemComponent?: ComponentType<LinkProps>;
};

export type IAccountLinkProps<LinkProps extends ILinkProps> = IWithNavItemComponentProps<LinkProps>;

export function AccountLink<LinkProps extends ILinkProps = ILinkProps>({
  NavItemComponent,
  ...props
}: IAccountLinkProps<LinkProps>): ReactElement {
  const { useLink } = useUIContext();
  const { t } = useTranslation("identity");

  const linkComponentProps = {
    children: t("My account"),
    ...props,
  } as LinkProps;

  return useLink({
    href: "/account",
    Component: NavItemComponent,
    ...linkComponentProps,
  });
}

export type ILogoutLinkProps<LinkProps extends ILinkProps> = IWithNavItemComponentProps<LinkProps>;

export function LogoutLink<LinkProps extends ILinkProps = ILinkProps>({
  NavItemComponent,
  onClick,
  ...props
}: ILogoutLinkProps<LinkProps>): ReactElement {
  const { logout } = useIdentityContext();
  const { t } = useTranslation("identity");
  const { useRouter } = useRouterContext();
  const { useLoader, useErrorNotification } = useUIContext();
  const { loader, setLoading } = useLoader({ loading: false });
  const { errorNotification, setErrorNotification } = useErrorNotification({
    title: t("Log out"),
  });
  const router = useRouter();
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
    href: "#",
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
  NavItemComponent,
}: IUserLoggedHeaderNavProps<LinkProps>): ReactElement | null {
  const { user, displayName } = useIdentityContext();

  if (!user) {
    return null;
  }

  const withNavItemComponentProps = {
    NavItemComponent: NavItemComponent,
  } as IWithNavItemComponentProps<LinkProps>;

  return (
    <div key="userNav" id="userNav" title={displayName()}>
      <AccountLink<LinkProps> {...withNavItemComponentProps} />
      <LogoutLink<LinkProps> {...withNavItemComponentProps} />
    </div>
  );
}

export type IUserUnloggedHeaderNavProps<LinkProps extends ILinkProps> = {
  NavItemComponent?: ComponentType<LinkProps>;
};

export function UserUnloggedHeaderNav<LinkProps extends ILinkProps = ILinkProps>({
  NavItemComponent,
}: IUserUnloggedHeaderNavProps<LinkProps>): ReactElement | null {
  const { t } = useTranslation();
  const { user, auth } = useIdentityContext();
  const { useModal } = useUIContext();
  const { useLink } = useUIContext();

  const { modal, openModal, closeModal } = useModal({
    title: t("Sign In / Sign Up"),
    body: auth,
  });

  useEffect(() => {
    if (user) {
      closeModal();
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
    href: "#",
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
    <div>
      <UserLoggedHeaderNav<LinkProps> />
      <UserUnloggedHeaderNav<LinkProps> />
    </div>
  );
}

import React, { ComponentType, ReactElement, useEffect } from "react";

import { useTranslation } from "../../../i18n/I18n";
import { useIdentityContext } from "../../../identity/Identity";
import { Link } from "../../../router/Link";
import { useUIContext } from "../../UI";

export const UserLoggedHeaderNav = (): ReactElement | null => {
  const { user, logout } = useIdentityContext();
  const { t } = useTranslation();

  if (!user) {
    return null;
  }

  return (
    <div key="userNav" id="userNav" title={user.displayName()}>
      <Link href="/account">{t("My account")}</Link>
      <Link href="#" onClick={logout}>
        {t("Log out")}
      </Link>
    </div>
  );
};

export const UserUnloggedHeaderNav = (): ReactElement | null => {
  const { t } = useTranslation();
  const { user, AuthComponent } = useIdentityContext();
  const { useModal } = useUIContext();

  const { modal, openModal, closeModal } = useModal({
    title: t("Sign In / Sign Up"),
    children: AuthComponent,
  });

  useEffect(() => {
    if (user) {
      closeModal();
    }
  }, [user]);

  if (user) {
    return null;
  }
  const handleOnClick = () => openModal();

  return (
    <>
      {modal}
      <Link href="#" key="signup_signin" onClick={handleOnClick}>
        {t("Sign In / Sign Up")}
      </Link>
    </>
  );
};

export type IUserHeaderProps = Record<string, unknown>;
export type UserHeaderNavComponent<H extends IUserHeaderProps = IUserHeaderProps> = ComponentType<
  H
>;

export const UserHeaderNav: UserHeaderNavComponent = () => {
  const { identityProvider } = useIdentityContext();

  if (!identityProvider) {
    return null;
  }

  return (
    <div>
      <UserLoggedHeaderNav />,
      <UserUnloggedHeaderNav />,
    </div>
  );
};

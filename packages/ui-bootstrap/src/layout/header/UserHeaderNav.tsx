import { useRouterContext, useTranslation } from "@reactionable/core";
import { useIdentityContext } from "@reactionable/core/lib/identity/Identity";
import React, { ComponentType, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Modal, useModal } from "../../modal/Modal";

const UserLoggedHeaderNav = () => {
  const { user, logout } = useIdentityContext();
  const { t } = useTranslation("identity");
  const { RouterLink } = useRouterContext();

  if (!user) {
    return null;
  }

  return (
    <NavDropdown key="userNav" id="userNav" title={user.displayName()}>
      <NavDropdown.Item as={RouterLink} href="/account">
        {t("My account")}
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item as={RouterLink} href="#" onClick={logout}>
        {t("Log out")}
      </NavDropdown.Item>
    </NavDropdown>
  );
};

const UserUnloggedHeaderNav = () => {
  const { RouterLink } = useRouterContext();
  const { t } = useTranslation("identity");
  const { user, auth } = useIdentityContext();
  const { modal, openModal, closeModal } = useModal({
    Component: Modal,
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
  const handleOnClick = () => openModal();

  return (
    <>
      {modal}
      <RouterLink href="#">
        <Nav.Link key="signup_signin" onClick={handleOnClick}>
          {t("Sign In / Sign Up")}
        </Nav.Link>
      </RouterLink>
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

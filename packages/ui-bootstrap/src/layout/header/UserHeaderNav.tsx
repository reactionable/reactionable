import { useIdentityContext } from "@reactionable/core/lib/identity/Identity";
import {
  AccountLink,
  LogoutLink,
  UserUnloggedHeaderNav,
} from "@reactionable/core/lib/ui/layout/header/UserHeaderNav";
import { ReactElement } from "react";
import { NavLinkProps } from "react-bootstrap";
import { DropdownItemProps } from "react-bootstrap/esm/DropdownItem";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

export { UserUnloggedHeaderNav } from "@reactionable/core/lib/ui/layout/header/UserHeaderNav";

const UserLoggedHeaderNav = () => {
  const { user, displayName } = useIdentityContext();
  if (!user) {
    return null;
  }

  return (
    <NavDropdown id="userLoggedHeaderNav" title={displayName()} className="justify-content-end">
      <AccountLink NavItemComponent={NavDropdown.Item} />
      <NavDropdown.Divider />
      <LogoutLink<DropdownItemProps> NavItemComponent={NavDropdown.Item} />
    </NavDropdown>
  );
};

export const UserHeaderNav = (): ReactElement | null => {
  const { identityProvider } = useIdentityContext();

  if (!identityProvider) {
    return null;
  }

  return (
    <>
      <UserLoggedHeaderNav />
      <UserUnloggedHeaderNav<NavLinkProps> NavItemComponent={Nav.Link} />
    </>
  );
};

import { useIdentityContext } from "@reactionable/core/lib/identity/Identity";
import {
  AccountLink,
  LogoutLink,
  UserUnloggedHeaderNav,
} from "@reactionable/core/lib/ui/layout/header/UserHeaderNav";
import { ReactElement, ComponentProps } from "react";
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
      <LogoutLink<ComponentProps<typeof NavDropdown.Item>> NavItemComponent={NavDropdown.Item} />
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
      <UserUnloggedHeaderNav<ComponentProps<typeof Nav.Link>> NavItemComponent={Nav.Link} />
    </>
  );
};

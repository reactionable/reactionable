import * as React from 'react';
import Navbar, { NavbarProps } from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';
import { Link, LinkProps } from 'react-router-dom';
import { useIdentityContext, IHeaderProps as ICoreHeaderProps } from '@reactionable/core';
import { useModal } from '../../modal/Modal';
import { INavItem, navItemToComponent } from '../../nav/NavItem';

export type IHeaderProps = Omit<ICoreHeaderProps<INavItem>, 'brand'> & NavbarProps & {
    brand?: string | LinkProps
};

export function Header({ brand, navItems = [], ...navbarProps }: React.PropsWithChildren<IHeaderProps>) {
    const { t } = useTranslation();
    const { user, logout, component, identityProvider } = useIdentityContext();
    const { modal, openModal, closeModal } = useModal({
        title: t('Sign In / Sign Up'),
        body: component,
    });

    React.useEffect(() => {
        if (user) {
            closeModal();
        }
    }, [user]);

    const userMenuItems: Array<React.ReactNode> = [];
    let identityModal = undefined;

    if (identityProvider) {
        if (user) {
            userMenuItems.push(
                <NavDropdown key="userNav" id="userNav" title={user.displayName()}>
                    <NavDropdown.Item as={Link} to="/account">{t('My account')}</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="#" onClick={logout}>{t('Log out')}</NavDropdown.Item>
                </NavDropdown>
            );
        }
        else if (user === null) {
            const handleOnClick = () => openModal();
            userMenuItems.push(<Nav.Link
                as={Link}
                to="#"
                key="signup_signin"
                onClick={handleOnClick}
            >{t('Sign In / Sign Up')}</Nav.Link>);

            identityModal = modal;
        }
    }

    return <>
        {identityModal}
        <Navbar
            expand="lg"
            {...navbarProps}
        >
            {brand && <Navbar.Brand as={Link} to="/" {...('string' === typeof brand ? { children: brand } : brand)} />}
            <Navbar.Toggle aria-controls="main-navbar-nav" />
            <Navbar.Collapse id="main-navbar-nav">
                <Nav className="mr-auto">{navItems?.map(navItemToComponent)}</Nav>
                {userMenuItems.length > 0 && <Nav>{userMenuItems}</Nav>}
            </Navbar.Collapse>
        </Navbar>
    </>;
};
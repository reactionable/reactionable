import * as React from 'react';
import Navbar, { NavbarProps } from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useIdentityContext, IHeaderProps as ICoreHeaderProps } from '@reactionable/core';
import { useModal } from '../../modal/Modal';

export interface IHeaderProps extends ICoreHeaderProps {
    navbarProps?: NavbarProps;
};

export const Header: React.FC<IHeaderProps> = ({ brand, navbarProps = {}, navStartItems = [] }) => {

    const { t } = useTranslation();
    const { user, logout, component, identityProvider } = useIdentityContext();
    
    const userMenuItems: React.ReactNode[] = [];
    let identityModal = undefined;
    if (identityProvider) {
        const { modal, openModal } = useModal({
            title: t('Sign In / Sign Up'),
            body: component,
        });
        identityModal = modal;

        if (user) {
            userMenuItems.push(
                <NavDropdown key="userNav" id="userNav" title={user.displayName()}>
                    <NavDropdown.Item href="/account">{t('My account')}</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#" onClick={logout}>{t('Log out')}</NavDropdown.Item>
                </NavDropdown>
            );
        }
        else {
            const handleOnClick = () => openModal();
            userMenuItems.push(
                <Nav.Link
                    as={Link}
                    to="#"
                    key="signup_signin"
                    onClick={handleOnClick} className="btn btn-link"
                >{t('Sign Up / Sign In')}</Nav.Link>
            );
        }
    }

    return <>
        {identityModal}
        <Navbar {...Object.assign({
            expand: 'lg',
        }, navbarProps)}>
            {brand && <Navbar.Brand href="/">{brand}</Navbar.Brand>}
            <Navbar.Toggle aria-controls="main-navbar-nav" />
            <Navbar.Collapse id="main-navbar-nav">
                <Nav className="mr-auto">{navStartItems}</Nav>
            </Navbar.Collapse>
            {userMenuItems.length > 0 && <Nav>{userMenuItems}</Nav>}
        </Navbar>
    </>;
};
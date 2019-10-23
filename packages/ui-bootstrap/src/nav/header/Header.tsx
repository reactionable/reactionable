import React, { ReactNode, ReactElement } from 'react';
import Navbar, { NavbarProps } from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuthenticator } from './Authenticator/Authenticator';

interface IProps {
    brand?: ReactElement;
    navbarProps?: NavbarProps;
    navStartItems?: ReactNode[];
};

const Header: React.FC<IProps> = ({ brand, navbarProps = {}, navStartItems = [] }) => {

    const { t } = useTranslation();
    const {
        user,
        modal,
        open,
        logout
    } = useAuthenticator();

    const userMenuItems: ReactNode[] = [];
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

        const handleOnClick = () => open();

        userMenuItems.push(
            <Nav.Link
                as={Link}
                to="#"
                key="signup_signin"
                onClick={handleOnClick} className="btn btn-outline-primary"
            >{t('Sign Up / Sign In')}</Nav.Link>
        );
    }

    return <>
        {!user && modal}
        <Navbar {...Object.assign({
            variant: 'dark',
            expand: 'lg',
        }, navbarProps)}>
            {brand && <Navbar.Brand href="/">{brand}</Navbar.Brand>}
            <Navbar.Toggle aria-controls="main-navbar-nav" />
            <Navbar.Collapse id="main-navbar-nav">
                <Nav className="mr-auto">{navStartItems}</Nav>
            </Navbar.Collapse>
            <Nav>{userMenuItems}</Nav>
        </Navbar>
    </>;
};

export default Header;
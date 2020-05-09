import React, { PropsWithChildren, useState, useEffect, FC } from 'react';
import { useTranslation } from 'react-i18next';
import Collapse from 'react-bootstrap/Collapse';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { createNavItemContextProvider, INavItemsProps, INavItemsContext } from '@reactionable/core';
import { INavItem, navItemToComponent } from '../../nav/NavItem';

export type ISidebarNavItem = INavItem;

export interface ISidebarProps extends INavItemsProps<ISidebarNavItem> {}

export type ISidebarContext = INavItemsContext<ISidebarNavItem>;

const contextProvider = createNavItemContextProvider<ISidebarProps>({});

export const {
  NavItemContextProvider: SidebarContextProvider,
  useNavItemContext: useSidebarContext,
  NavItemContextConsumer: SidebarContextConsumer,
} = contextProvider;

const SidebarItems: FC = ({ children }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const { navItems } = useSidebarContext();

  return (
    <>
      <Collapse in={open}>
        <Col
          xs="auto"
          className="sidebar-left-side"
          style={{
            borderRight: 'solid 1px',
            height: '93vh',
            paddingTop: '1vh',
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          {!open && (
            <Button
              onClick={() => setOpen(!open)}
              aria-controls={t('Collapse sidebar')}
              aria-expanded={open}
            >
              {t('Collapse sidebar')}
            </Button>
          )}
          {navItems?.map(navItemToComponent)}
        </Col>
      </Collapse>
      <Col className="sidebar-right-side" style={{ height: '89vh', overflow: 'auto' }}>
        {children}
      </Col>
    </>
  );
};

export function Sidebar({ children }: PropsWithChildren<ISidebarProps>) {
  return (
    <Container
      fluid
      className="sidebar-container"
      style={{
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      <Row>
        <SidebarContextProvider>
          <SidebarItems children={children} />
        </SidebarContextProvider>
      </Row>
    </Container>
  );
}

export function setSidebarNavItems(navItems: Array<INavItem>) {
  const { setNavItems } = useSidebarContext();

  useEffect(() => {
    setNavItems(navItems);
  }, navItems);
}

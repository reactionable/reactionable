import {
  INavItemsContext,
  INavItemsProps,
  createNavItemContextProvider,
} from '@reactionable/core/lib/nav/NavItem';
import React, { ComponentType, PropsWithChildren, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';

import { INavItemProps, navItemToComponent } from '../../nav/NavItem';

export type ISidebarNavItem = INavItemProps;

export interface ISidebarProps extends INavItemsProps<ISidebarNavItem> {}

export type ISidebarContext = INavItemsContext<ISidebarNavItem>;

const contextProvider = createNavItemContextProvider<ISidebarProps>({});

export const {
  NavItemContextProvider: SidebarContextProvider,
  useNavItemContext: useSidebarContext,
  NavItemContextConsumer: SidebarContextConsumer,
} = contextProvider;

const SidebarItems: ComponentType = ({ children }) => {
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

export function setSidebarNavItems(navItems: Array<INavItemProps>) {
  const { setNavItems } = useSidebarContext();

  useEffect(() => {
    setNavItems(navItems);
  }, navItems);
}

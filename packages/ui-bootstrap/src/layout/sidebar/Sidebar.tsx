import React, { PropsWithChildren, useState, useEffect } from 'react';
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

export function Sidebar({ children }: PropsWithChildren<ISidebarProps>) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);

  return (
    <SidebarContextProvider>
      <Container
        fluid
        className="sidebar-container"
        style={{
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Row>
          <SidebarContextConsumer>
            {(context: ISidebarContext) => (
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
                    {open && context.navItems?.map(navItemToComponent)}
                  </Col>
                </Collapse>
                <Col className="sidebar-right-side" style={{ height: '89vh', overflow: 'auto' }}>
                  {children}
                </Col>
              </>
            )}
          </SidebarContextConsumer>
        </Row>
      </Container>
    </SidebarContextProvider>
  );
}

export function setSidebarNavItems(navItems: Array<INavItem>) {
  useEffect(() => {
    useSidebarContext().setNavItems(navItems);
  }, [navItems]);
}

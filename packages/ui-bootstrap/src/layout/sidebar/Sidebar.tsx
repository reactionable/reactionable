import {
  useTranslation,
  INavItemsProps,
  INavItemsProviderProps as ICoreNavItemsProviderProps,
  Sidebar as CoreSidebar,
  ISidebarProps as ICoreSidebarProps,
  useSidebarContext as coreUseSidebarContext,
} from "@reactionable/core";
import { PropsWithChildren, ReactElement, useState } from "react";
import { Button, Col, Collapse, Container, Nav, Row } from "react-bootstrap";

import { INavItemProps, NavItems } from "../../nav/NavItem";

export type INavItemsProviderProps = ICoreNavItemsProviderProps<INavItemsProps<INavItemProps>>;

export type ISidebarProps = ICoreSidebarProps<INavItemsProps<INavItemProps>>;

export function useSidebarContext(): INavItemsProviderProps {
  return coreUseSidebarContext();
}

const SidebarItems = ({ children }: PropsWithChildren<unknown>): ReactElement => {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(true);
  const { navItems } = useSidebarContext();

  return (
    <>
      <Collapse in={open}>
        <Col
          xs="auto"
          className="sidebar-left-side"
          style={{
            borderRight: "solid 1px",
            height: "93vh",
            paddingTop: "1vh",
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          {!open && (
            <Button
              onClick={() => setOpen(!open)}
              aria-controls={t("Collapse sidebar") ?? undefined}
              aria-expanded={open}
            >
              {t("Collapse sidebar")}
            </Button>
          )}
          <Nav className="flex-column">
            <NavItems navItems={navItems} />
          </Nav>
        </Col>
      </Collapse>
      <Col className="sidebar-right-side" style={{ height: "89vh", overflow: "auto" }}>
        {children}
      </Col>
    </>
  );
};

export function SidebarComponent({ children }: ISidebarProps): ReactElement {
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
        <SidebarItems>{children}</SidebarItems>
      </Row>
    </Container>
  );
}

export function Sidebar(props: PropsWithChildren<ISidebarProps>): ReactElement {
  return <CoreSidebar Component={SidebarComponent} {...props} />;
}

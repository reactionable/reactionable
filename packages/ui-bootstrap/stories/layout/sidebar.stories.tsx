import React, { FC } from 'react';
import { MemoryRouter as Router, useRouteMatch } from 'react-router-dom';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { UIContextProvider, generatePath } from '@reactionable/core';
import { useUIContextProviderProps } from '../../src/UI';
import { Sidebar, setSidebarNavItems } from '../../src/layout/sidebar/Sidebar';
import '../config';

export default { title: 'UI Bootstrap/Layout/Sidebar', parameters: { info: { inline: true }, component: Sidebar} };

const SampleComponent: FC = () => {
  const { t } = useTranslation();
  const match = useRouteMatch();

  setSidebarNavItems([
    {
      to: generatePath(`${match.path}/sample`, match.params),
      title: t('Go to sample page'),
      icon: faImages,
      children: t('Sample'),
    },
  ]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <Jumbotron>
            <h1>Hello, world!</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling extra
              attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};

export const SimpleSidebar = () => (
  <UIContextProvider {...useUIContextProviderProps()}>
    <Router>
      <Sidebar>
        <SampleComponent />
      </Sidebar>
    </Router>
  </UIContextProvider>
);

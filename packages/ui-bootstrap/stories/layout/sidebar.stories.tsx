import '../config';

import { faImages } from '@fortawesome/free-solid-svg-icons';
import { generatePath, useRouteMatch } from '@reactionable/core';
import React, { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';

import { Sidebar, setSidebarNavItems } from '../../src/layout/sidebar/Sidebar';
import { UIContextProvider } from '../../src/UI';

export default {
  title: 'UI Bootstrap/Layout/Sidebar',
  parameters: { info: { inline: true }, component: Sidebar },
};

const SampleComponent: FC = () => {
  const { t } = useTranslation();
  const match = useRouteMatch();

  setSidebarNavItems([
    {
      href: generatePath(`${match.path}/sample`, match.params),
      title: t('Go to sample page'),
      icon: { icon: faImages },
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
  <UIContextProvider>
    <Sidebar>
      <SampleComponent />
    </Sidebar>
  </UIContextProvider>
);

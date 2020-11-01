import '../../config';

import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';

import { Body } from '../../../src/layout/body/Body';

export default {
  title: 'UI Bootstrap/Components/Layout/Body',
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Body },
};

export const SimpleBody = () => (
  <Body>
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
  </Body>
);

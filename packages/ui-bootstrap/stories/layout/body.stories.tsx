import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { Body } from '../../src/layout/body/Body';
import '../config';

export default {
  title: 'UI Bootstrap/Layout/Body',
  parameters: { info: { inline: true }, component: Body },
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

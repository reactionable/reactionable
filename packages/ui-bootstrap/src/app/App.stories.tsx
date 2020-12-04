import "../../stories/config";

import { App } from "@reactionable/core";
import React, { ReactElement, lazy } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";

import { useUIProviderProps } from "../UI";

export default {
  title: "UI Bootstrap/Components/App",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: App },
};

const HomeComponent = (): ReactElement => (
  <Container fluid>
    <Row>
      <Col>
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>
            This is a Basic hero unit, a Basic jumbotron-style component for calling extra attention
            to featured content or information.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>
      </Col>
    </Row>
  </Container>
);

const LazyHomeComponent = lazy(async () => ({
  default: HomeComponent,
}));

export const BasicApp = (): ReactElement => (
  <App ui={useUIProviderProps()} routes={[]} HomeComponent={LazyHomeComponent} />
);

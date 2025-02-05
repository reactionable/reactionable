import "../../../stories/config";

import type { Meta, StoryObj } from "@storybook/react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { Body } from "./Body";

const meta: Meta<typeof Body> = {
  title: "UI Bootstrap/Components/Layout/Body",
  component: Body,
};

export default meta;

type Story = StoryObj<typeof Body>;

export const BasicBody: Story = {
  args: {
    children: (
      <Container fluid>
        <Row>
          <Col>
            <Card body>
              <h1>Hello, world!</h1>
              <p>
                <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.{" "}
                <b>Lorem Ipsum</b> has been the industry&apos; standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was popularised in the
                1960s with the release of Letraset sheets containing <b>Lorem Ipsum</b> passages,
                and more recently with desktop publishing software like Aldus PageMaker including
                versions of <b>Lorem Ipsum</b>
              </p>
              <p>
                <Button variant="primary">Learn more</Button>
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    ),
  },
};

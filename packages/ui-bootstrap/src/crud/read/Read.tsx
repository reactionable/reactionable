import {
  Read as CoreRead,
  IReadProps as ICoreReadProps,
} from "@reactionable/core/lib/crud/read/Read";
import React, { ReactElement } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export type IReadProps<Data> = ICoreReadProps<Data>;

export function Read<Data>({ children, ...props }: IReadProps<Data>): ReactElement {
  return (
    <CoreRead<Data> {...props}>
      {(data: Data) => (
        <Container fluid>
          <Row>
            <Col>{children(data)}</Col>
          </Row>
        </Container>
      )}
    </CoreRead>
  );
}

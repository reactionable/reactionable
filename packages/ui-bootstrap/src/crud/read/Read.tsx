import {
  Read as CoreRead,
  IReadProps as ICoreReadProps,
} from '@reactionable/core/lib/crud/read/Read';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export interface IReadProps<Data> extends ICoreReadProps<Data> {}

export function Read<Data>({ children, ...props }: IReadProps<Data>) {
  return (
    <CoreRead<Data>
      {...props}
      children={(data: Data) => (
        <Container fluid>
          <Row>
            <Col>{children(data)}</Col>
          </Row>
        </Container>
      )}
    />
  );
}

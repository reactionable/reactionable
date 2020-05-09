import React, { PropsWithChildren } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IBodyProps as ICoreBodyProps } from '@reactionable/core';

export interface IBodyProps extends ICoreBodyProps {}

export function Body({ children }: PropsWithChildren<IBodyProps>) {
  return (
    <main>
      <Container fluid>
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
    </main>
  );
}

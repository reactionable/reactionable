import { IBodyProps as ICoreBodyProps } from '@reactionable/core/lib/ui/layout/body/Body';
import React, { PropsWithChildren } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

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

import { IBodyProps as ICoreBodyProps } from "@reactionable/core";
import { ComponentType, PropsWithChildren, ReactElement } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export type IBodyProps = ICoreBodyProps;
export type BodyComponent = ComponentType<IBodyProps>;

export function Body({ children }: PropsWithChildren<IBodyProps>): ReactElement {
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

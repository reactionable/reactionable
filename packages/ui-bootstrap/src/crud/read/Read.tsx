import { Read as CoreRead, IReadProps as ICoreReadProps, IData } from "@reactionable/core";
import { ReactElement } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export type IReadProps<Data extends IData = IData> = ICoreReadProps<Data>;

export function Read<Data extends IData = IData>({
  children,
  ...props
}: IReadProps<Data>): ReactElement {
  return (
    <CoreRead<Data> {...props}>
      {(props) => (
        <Container fluid>
          <Row>
            <Col>{children(props)}</Col>
          </Row>
        </Container>
      )}
    </CoreRead>
  );
}

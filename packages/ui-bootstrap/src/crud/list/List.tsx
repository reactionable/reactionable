import { List as CoreList, IListProps as ICoreListProps, IData } from "@reactionable/core";
import { ReactElement } from "react";
import { Col, Container, Row } from "react-bootstrap";

export type IListProps<Data extends IData = IData> = ICoreListProps<Data>;

export function List<Data extends IData = IData>({
  children,
  ...props
}: IListProps<Data>): ReactElement {
  return (
    <CoreList<Data> {...props}>
      {(props) => (
        <Container fluid>
          <Row>
            <Col>{children(props)}</Col>
          </Row>
        </Container>
      )}
    </CoreList>
  );
}

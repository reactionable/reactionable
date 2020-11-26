import {
  ListTable as CoreListTable,
  IListTableComponentProps,
  IListTableProps,
  ListTableBody,
  ListTableHead,
} from "@reactionable/core/lib/crud/list/ListTable";
import { IData } from "@reactionable/core/lib/query/Query";
import React, { PropsWithChildren, ReactElement } from "react";
import Table from "react-bootstrap/Table";

export function ListTableComponent<Data extends IData = IData>({
  head,
  ...bodyProps
}: IListTableComponentProps<Data>): ReactElement {
  return (
    <Table striped bordered hover responsive>
      <ListTableHead head={head} />
      <ListTableBody {...bodyProps} />
    </Table>
  );
}

export function ListTable<Data extends IData = IData>(
  props: PropsWithChildren<IListTableProps<Data>>
): ReactElement {
  return <CoreListTable<Data> Component={ListTableComponent} {...props} />;
}

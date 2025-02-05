import {
  ListTable as CoreListTable,
  IListTableProps as ICoreListTableProps,
  IListTableComponentProps,
  ListTableBody,
  ListTableHead,
  IData,
} from "@reactionable/core";
import { ReactElement } from "react";
import Table from "react-bootstrap/Table";

export type IListTableProps<Data extends IData = IData> = ICoreListTableProps<Data>;

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

export function ListTable<Data extends IData = IData>(props: IListTableProps<Data>): ReactElement {
  return <CoreListTable<Data> Component={ListTableComponent} {...props} />;
}

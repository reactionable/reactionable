import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableContainer from "@material-ui/core/TableContainer/TableContainer";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import {
  ListTable as CoreListTable,
  IListTableBodyProps,
  IListTableComponentProps,
  IListTableHeadProps,
  IListTableProps,
} from "@reactionable/core/lib/crud/list/ListTable";
import { useTranslation } from "@reactionable/core/lib/i18n/I18n";
import { IData } from "@reactionable/core/lib/query/Query";
import React, { PropsWithChildren, ReactElement } from "react";

export function ListTableHead({ head }: IListTableHeadProps): ReactElement {
  const { t } = useTranslation();
  return (
    <TableHead>
      <TableRow>
        {head?.map((item) =>
          "string" === typeof item ? <TableCell key={item}>{t(item)}</TableCell> : item
        )}
      </TableRow>
    </TableHead>
  );
}

export function ListTableBody<Data extends IData = IData>({
  data,
  children,
}: IListTableBodyProps<Data>): ReactElement {
  return <TableBody>{data.items.map((item) => children(item))}</TableBody>;
}

export function ListTableComponent<Data extends IData = IData>({
  head,
  ...bodyProps
}: IListTableComponentProps<Data>): ReactElement {
  return (
    <TableContainer>
      <Table>
        <ListTableHead head={head} />
        <ListTableBody {...bodyProps} />
      </Table>
    </TableContainer>
  );
}

export function ListTable<Data extends IData = IData>(
  props: PropsWithChildren<IListTableProps<Data>>
): ReactElement {
  return <CoreListTable<Data> Component={ListTableComponent} {...props} />;
}

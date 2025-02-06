import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  ListTable as CoreListTable,
  IListTableBodyProps,
  IListTableComponentProps,
  IListTableHeadProps,
  IListTableProps,
  useTranslation,
  IData,
} from "@reactionable/core";
import { ReactElement } from "react";

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

export function ListTable<Data extends IData = IData>(props: IListTableProps<Data>): ReactElement {
  return <CoreListTable<Data> Component={ListTableComponent} {...props} />;
}

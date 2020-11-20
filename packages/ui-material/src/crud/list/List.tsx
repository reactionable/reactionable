import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableContainer from "@material-ui/core/TableContainer/TableContainer";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import { IData } from "@reactionable/core";
import {
  List as CoreList,
  IListProps as ICoreListProps,
} from "@reactionable/core/lib/crud/list/List";
import { useTranslation } from "@reactionable/core/lib/i18n/I18n";
import React, { ComponentType, PropsWithChildren, ReactElement, ReactNode } from "react";

export interface IListProps<Data extends IData = IData>
  extends Omit<ICoreListProps<Data>, "children"> {
  head: Array<ReactNode | string>;
  children: (data: Data) => ReactNode;
}

export type ListComponent<Data extends IData = IData> = ComponentType<IListProps<Data>>;
export function List<Data extends IData = IData>({
  head,
  children,
  ...props
}: PropsWithChildren<IListProps<Data>>): ReactElement {
  const { t } = useTranslation();

  return (
    <CoreList<Data> {...props}>
      {({ data }) => (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {head.map((item) =>
                  "string" === typeof item ? <TableCell key={item}>{t(item)}</TableCell> : item
                )}
              </TableRow>
            </TableHead>
            <TableBody>{data.items.map((item) => children(item))}</TableBody>
          </Table>
        </TableContainer>
      )}
    </CoreList>
  );
}

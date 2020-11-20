import { IData } from "@reactionable/core";
import {
  List as CoreList,
  IListProps as ICoreListProps,
} from "@reactionable/core/lib/crud/list/List";
import { useTranslation } from "@reactionable/core/lib/i18n/I18n";
import React, { ComponentType, PropsWithChildren, ReactElement, ReactNode } from "react";
import Table from "react-bootstrap/Table";

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
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              {head.map((item) =>
                "string" === typeof item ? <th key={item}>{t(item)}</th> : item
              )}
            </tr>
          </thead>
          <tbody>{data.items.map((item) => children(item))}</tbody>
        </Table>
      )}
    </CoreList>
  );
}

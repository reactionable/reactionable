import { ComponentType, ReactElement, ReactNode } from "react";

import { IData } from "../../query/Query";
import { IListProps, List } from "./List";

export type IListTableHeadProps = {
  head?: Array<ReactNode | string>;
};
export function ListTableHead({ head }: IListTableHeadProps): ReactElement {
  return (
    <thead>
      <tr>{head?.map((item) => ("string" === typeof item ? <th key={item}>{item}</th> : item))}</tr>
    </thead>
  );
}

export type IListTableBodyProps<Data extends IData = IData> = Parameters<
  IListProps<Data>["children"]
>[0] & {
  children: (data: Data) => ReactNode;
};

export function ListTableBody<Data extends IData = IData>({
  data,
  children,
}: IListTableBodyProps<Data>): ReactElement {
  return <tbody>{data?.items.map((item) => children(item))}</tbody>;
}

export type IListTableComponentProps<Data extends IData = IData> = IListTableBodyProps<Data> &
  Pick<IListTableHeadProps, "head">;

export function ListTableComponent<Data extends IData = IData>({
  head,
  ...bodyProps
}: IListTableComponentProps<Data>): ReactElement {
  return (
    <table>
      <ListTableHead head={head} />
      <ListTableBody {...bodyProps} />
    </table>
  );
}

export type IListTableProps<Data extends IData = IData> = Omit<IListProps<Data>, "children"> &
  Pick<IListTableBodyProps<Data>, "children"> &
  Pick<IListTableHeadProps, "head"> & {
    Component?: ComponentType<IListTableComponentProps<Data>>;
  };

export function ListTable<Data extends IData = IData>({
  head,
  children,
  Component = ListTableComponent,
  ...props
}: IListTableProps<Data>): ReactElement {
  return (
    <List<Data> {...props}>
      {(childrenProps) => (
        <Component head={head} {...childrenProps}>
          {children}
        </Component>
      )}
    </List>
  );
}

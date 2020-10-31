import {
  List as CoreList,
  IListProps as ICoreListProps,
} from '@reactionable/core/lib/crud/list/List';
import React, { ComponentType, PropsWithChildren, ReactNode } from 'react';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';

export interface IListProps<Data> extends Omit<ICoreListProps<Data>, 'children'> {
  head: Array<ReactNode | string>;
  children: (data: Data) => ReactNode;
}

export type ListComponent<Data> = ComponentType<IListProps<Data>>;
export function List<Data>({ head, children, ...props }: PropsWithChildren<IListProps<Data>>) {
  const { t } = useTranslation();

  return (
    <CoreList<Data>
      {...props}
      children={(data) => (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              {head.map((item) =>
                'string' === typeof item ? <th key={item}>{t(item)}</th> : item
              )}
            </tr>
          </thead>
          <tbody>{data.map((item) => children(item))}</tbody>
        </Table>
      )}
    />
  );
}

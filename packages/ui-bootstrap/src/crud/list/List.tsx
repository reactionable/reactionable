import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import { List as CoreList, IListProps as ICoreListProps } from '@reactionable/core';

export interface IListProps<Data> extends Omit<ICoreListProps<Data>, 'children'> {
    head: Array<ReactElement | string>;
    children: (data: Data) => ReactElement;
};

export type ListComponent<Data> = FC<IListProps<Data>>;
export function List<Data>({ head, children, ...props }: PropsWithChildren<IListProps<Data>>) {

    const { t } = useTranslation();

    return <CoreList<Data>
        {...props}
        children={data => <Table striped bordered hover responsive>
            <thead>
                <tr>{head.map(item => 'string' === typeof item ? <th key={item}>{t(item)}</th> : item)}</tr>
            </thead>
            <tbody>{data.map(item => children(item))}</tbody>
        </Table>}
    />;
};
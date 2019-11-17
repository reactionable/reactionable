import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import { List as CoreList, IListProps as ICoreListProps } from '@reactionable/core';

export interface IListProps<Data> extends Omit<ICoreListProps<Data>, 'render'> {
    head: Array<ReactElement | string>;
    render: (item: Data) => ReactElement;
};

export type ListComponent<Data> = FC<IListProps<Data>>;
export function List<Data>({ head, render, ...props }: PropsWithChildren<IListProps<Data>>) {

    const { t } = useTranslation();

    return <CoreList<Data>
        {...props}
        render={(data: Array<Data>) => <Table striped bordered hover responsive>
            <thead>
                <tr>{head.map(item => 'string' === typeof item ? <th key={item}>{t(item)}</th> : item)}</tr>
            </thead>
            <tbody>{data.map(item => render(item))}</tbody>
        </Table>}
    />;
};
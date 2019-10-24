import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import { List as CoreList, IListProps as ICoreListProps } from '@reactionable/core';
import { Loader } from '../../loader/Loader';
import { useAlert } from '../../alert/Alert';
import { useErrorAlert } from '../../alert/ErrorAlert';

export interface IListProps<Data> extends Omit<ICoreListProps<Data>, 'render' | 'LoaderComponent' | 'errorAlert' | 'noDataAlert'> {
    noData: string | React.ReactNode
    head: Array<React.ReactElement | string>;
    render: (item: Data) => React.ReactElement;
};

export type ListComponent<Data = any> = React.FC<IListProps<Data>>;
export const List: ListComponent = ({ head, render, noData, ...props }) => {

    const { t } = useTranslation();

    const errorAlert = useErrorAlert();
    const noDataAlert = useAlert({ children: noData, 'variant': 'warning', 'className': 'text-center' });

    return <CoreList
        {...props}
        LoaderComponent={Loader}
        errorAlert={errorAlert}
        noDataAlert={noDataAlert}
        render={(data: Array<any>) => <Table striped bordered hover responsive>
            <thead>
                <tr>{head.map(item => 'string' === typeof item ? <th key={item}>{t(item)}</th> : item)}</tr>
            </thead>
            <tbody>{data.map(item => render(item))}</tbody>
        </Table>}
    />;
};
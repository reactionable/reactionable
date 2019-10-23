import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import { List as CoreList, IListProps as ICoreListProps } from '@reactionable/core';
import { Loader } from '../../loader/Loader';
import { ErrorAlert } from '../../error-alert/ErrorAlert';

export interface IListProps<Data> extends Omit<ICoreListProps<Data>, 'render' | 'LoaderComponent' | 'ErrorAlertComponent'> {
    head: Array<ReactElement|string>;
    render: (item: Data) => ReactElement;
};

export type ListComponent<Data = any> = React.FC<IListProps<Data>>;
export const List: ListComponent = ({ head, render, ...props }) => {

    const { t } = useTranslation();

    return <CoreList
        {...props}
        LoaderComponent={Loader}
        ErrorAlertComponent={ErrorAlert}
        render={(data: Array<any>) => <Table striped bordered hover responsive>
            <thead>
                <tr>{head.map(item => 'string' === typeof item ? <th key={item}>{t(item)}</th> : item)}</tr>
            </thead>
            <tbody>{data.map(item => render(item))}</tbody>
        </Table>}
    />;
};
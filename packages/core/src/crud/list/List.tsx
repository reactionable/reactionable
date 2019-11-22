import React, { ReactElement } from 'react';
import { IUseQueryListResult } from '../query/QueryList';
import { IQueryWrapperProps, QueryWrapper } from '../query/QueryWrapper';

export type IListProps<Data> = Omit<IQueryWrapperProps<IUseQueryListResult<Data>>, 'children'> & {
    children: (data: Array<Data>) => ReactElement;
};

export type ListComponent<Data> = React.FC<IListProps<Data>>;

export function List<Data>({ children, ...props }: IListProps<Data>) {

    const renderChildren = (props: IUseQueryListResult<Data>) => {
        return children(props.data);
    };

    return <QueryWrapper<Array<Data>, IUseQueryListResult<Data>> {...props} children={renderChildren} />;
};
import React, { ReactElement } from 'react';
import { IUseQueryResult } from '../query/Query';
import { IQueryWrapperProps, IQueryWrapperChildrenProps, QueryWrapper } from '../query/QueryWrapper';

export type IReadProps<Data> = Omit<IQueryWrapperProps<IUseQueryResult<Data>>, 'children'> & {
    children: (data: Data) => ReactElement;
};

export type ReadComponent<Data> = React.FC<IReadProps<Data>>;

export function Read<Data>({ children, ...props }: IReadProps<Data>) {
    const renderChildren = (props: IQueryWrapperChildrenProps<IUseQueryResult<Data>>) => {
        return children(props.data);
    };
    return <QueryWrapper<Data> {...props} children={renderChildren} />;
};
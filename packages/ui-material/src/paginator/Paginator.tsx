import MaterialUIPagination, { PaginationProps } from '@material-ui/lab/Pagination/Pagination';
import {
  Paginator as CorePaginator,
  IPaginationProps as ICorePaginationProps,
  IPaginatorProps as ICorePaginatorProps,
} from '@reactionable/core/lib/ui/paginator/Paginator';
import React from 'react';

export type IPaginationProps = Omit<
  ICorePaginationProps,
  | 'PaginationLinkComponent'
  | 'PaginationEllipsisComponent'
  | 'PaginationLinkFirstComponent'
  | 'PaginationLinkPrevComponent'
  | 'PaginationLinkNextComponent'
  | 'PaginationLinkLastComponent'
> &
  PaginationProps;

export function Pagination({ pageCount: count, currentPage: page, ...props }: IPaginationProps) {
  return <MaterialUIPagination page={page} count={count} {...props} />;
}

export type IPaginatorProps = Omit<ICorePaginatorProps, 'PaginationComponent'>;
export function Paginator(props: IPaginatorProps & PaginationProps) {
  return <CorePaginator {...props} PaginationComponent={Pagination} />;
}

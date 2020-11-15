import MaterialUIPagination, { PaginationProps } from "@material-ui/lab/Pagination/Pagination";
import {
  Paginator as CorePaginator,
  IPaginationProps as ICorePaginationProps,
  IPaginatorProps as ICorePaginatorProps,
} from "@reactionable/core/lib/ui/paginator/Paginator";
import React, { ReactElement } from "react";

export type IPaginationProps = Omit<
  ICorePaginationProps,
  | "PaginationLinkComponent"
  | "PaginationEllipsisComponent"
  | "PaginationLinkFirstComponent"
  | "PaginationLinkPrevComponent"
  | "PaginationLinkNextComponent"
  | "PaginationLinkLastComponent"
> &
  PaginationProps;

export function Pagination({
  pageCount: count,
  currentPage: page,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pageRangeDisplayed,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  marginPagesDisplayed,
  ...props
}: IPaginationProps): ReactElement {
  return <MaterialUIPagination page={page} count={count} {...props} />;
}

export type IPaginatorProps = Omit<ICorePaginatorProps, "PaginationComponent">;
export function Paginator(props: IPaginatorProps & PaginationProps): ReactElement {
  return <CorePaginator {...props} PaginationComponent={Pagination} />;
}

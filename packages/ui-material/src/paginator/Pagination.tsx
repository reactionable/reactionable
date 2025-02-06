import MaterialUIPagination, { PaginationProps } from "@mui/material/Pagination";
import { IPaginationProps as ICorePaginationProps } from "@reactionable/core";
import { ReactElement } from "react";

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

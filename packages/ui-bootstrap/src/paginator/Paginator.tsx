import {
  Pagination as CorePagination,
  Paginator as CorePaginator,
  IPaginationProps as ICorePaginationProps,
  IPaginatorProps as ICorePaginatorProps,
} from "@reactionable/core/lib/ui/paginator/Paginator";
import { ReactElement } from "react";
import BootstrapPagination from "react-bootstrap/Pagination";

export type IPaginationProps = Omit<
  ICorePaginationProps,
  | "PaginationLinkComponent"
  | "PaginationEllipsisComponent"
  | "PaginationLinkFirstComponent"
  | "PaginationLinkPrevComponent"
  | "PaginationLinkNextComponent"
  | "PaginationLinkLastComponent"
>;

export function Pagination(props: IPaginationProps): ReactElement {
  return (
    <BootstrapPagination>
      <CorePagination
        {...props}
        PaginationLinkComponent={BootstrapPagination.Item}
        PaginationEllipsisComponent={BootstrapPagination.Ellipsis}
        PaginationLinkFirstComponent={BootstrapPagination.First}
        PaginationLinkPrevComponent={BootstrapPagination.Prev}
        PaginationLinkNextComponent={BootstrapPagination.Next}
        PaginationLinkLastComponent={BootstrapPagination.Last}
      />
    </BootstrapPagination>
  );
}

export type IPaginatorProps = Omit<ICorePaginatorProps, "PaginationComponent">;
export function Paginator(props: IPaginatorProps): ReactElement {
  return <CorePaginator {...props} PaginationComponent={Pagination} />;
}
